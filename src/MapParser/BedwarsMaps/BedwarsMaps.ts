import { Player, Vector3, world } from "@minecraft/server";
import {
  bedwarsBlockBreak,
  bedwarsPlayerPlace,
} from "Bedwars/BedwarsBlockBreak";
import { IBedwarsData } from "Bedwars/BedwarsMain";
import { bedwarsSpawn } from "Bedwars/BedwarsSpawn";
import { EGameMode, IMapData, MapParser } from "MapParser/loadMap";
import { TickFunctions } from "staticScripts/tickFunctions";
import { VectorFunctions } from "staticScripts/vectorFunctions";

export const bedwarsStart = async (
  mapData: IMapData<EGameMode.BEDWARS>,
  offset: Vector3
) => {
  let players = mapData.players;
  const bedwarsData = mapData.gameModeData as IBedwarsData;
  let currentPlayerIndex = 0;

  for (const team of bedwarsData.teams) {
    for (let i = 0; i < team.playerAmount; i++) {
      if (currentPlayerIndex >= players.length) {
        break;
      }
      const player = players[currentPlayerIndex];
      currentPlayerIndex++;
      team.players.push(player);
    }

    //Add offset to spawn points
    // Add offset to spawn points
    for (let i = 0; i < team.spawnPoints.length; i++) {
      team.spawnPoints[i] = VectorFunctions.addVector(
        team.spawnPoints[i],
        offset
      );
    }
  }
  bedwarsData.playerPlacedBlockLocations = new Set();

  const playerPlaceFunction = bedwarsPlayerPlace(bedwarsData);
  world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
    playerPlaceFunction(eventData);
  });

  const boundFunction = bedwarsBlockBreak(mapData);
  world.beforeEvents.playerBreakBlock.subscribe((eventData) => {
    boundFunction(eventData);
  });
  //We need no tick function for bedwars
  /* mapData.tickFunctionId = TickFunctions.addFunction(
    bridgeTick.bind(this, mapData),
    5
  ); */
  //bridgeNextRound(mapData, "Round start!");
};

export const bedwarsUnload = async (mapData: IMapData) => {};

export const largeMap: IMapData<EGameMode.BEDWARS> = {
  name: "largeMap",
  description: "largeMap",
  gameMode: 1,
  minimumPlayerAmount: 1,
  players: [],
  startLocation: { x: -100, y: 270, z: -100 },
  endLocation: { x: 100, y: 320, z: 100 },
  entities: [],

  structureId: "mystructure:large_map",

  playerSpawnFunction: bedwarsSpawn,

  tickFunctionId: -1,
  mapId: -1,

  structures: [],

  gameModeData: {
    playerPlacedBlockLocations: new Set(),
    teams: [
      {
        playerAmount: 1,
        players: [],
        spawnPoints: [{ x: -100, y: 270, z: -100 }],
        teamName: "§9RED",
      },
    ],
  },
};
