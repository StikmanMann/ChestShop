import { ItemStack, world } from "@minecraft/server";
import { bedwarsBlockBreak, bedwarsPlayerPlace, } from "Bedwars/BedwarsBlockBreak";
import { bedwarsSpawn } from "Bedwars/BedwarsSpawn";
import { BedwarsTeam } from "Bedwars/Teams/TeamColor";
import { GlobalVars } from "globalVars";
import { TickFunctions } from "staticScripts/tickFunctions";
import { VectorFunctions } from "staticScripts/vectorFunctions";
export const bedwarsStart = async (mapData, offset) => {
    let players = mapData.players;
    const bedwarsData = mapData.gameModeData;
    let currentPlayerIndex = 0;
    for (const team of bedwarsData.teams) {
        //Add generator
        team.generator = VectorFunctions.subtractVector(VectorFunctions.addVector(team.generator, offset), mapData.startLocation);
        // Add offset to spawn points
        for (let i = 0; i < team.spawnPoints.length; i++) {
            team.spawnPoints[i] = VectorFunctions.subtractVector(VectorFunctions.addVector(team.spawnPoints[i], offset), mapData.startLocation);
        }
        for (let i = 0; i < team.playerAmount; i++) {
            if (currentPlayerIndex >= players.length) {
                break;
            }
            const player = players[currentPlayerIndex];
            currentPlayerIndex++;
            team.players.push(player);
            player.teleport(team.spawnPoints[i % team.spawnPoints.length]);
            BedwarsTeam.setPlayerColor(player, team.teamColor);
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
    mapData.tickFunctionId = TickFunctions.addFunction(bedwarsTick(mapData), 5);
    //bridgeNextRound(mapData, "Round start!");
};
export const bedwarsUnload = async (mapData) => { };
const bedwarsTick = (mapData) => () => {
    for (const team of mapData.gameModeData.teams) {
        GlobalVars.overworld.spawnItem(new ItemStack("minecraft:copper_ingot"), team.generator);
    }
};
export const largeMap = {
    name: "largeMap",
    description: "largeMap",
    gameMode: 1,
    minimumPlayerAmount: 1,
    players: [],
    startLocation: { x: -100, y: 270, z: -100 },
    endLocation: { x: 100, y: 319, z: 100 },
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
                spawnPoints: [{ x: 40, y: 272, z: 85 }],
                teamName: "§5Purple",
                teamColor: "purple",
                generator: { x: 40, y: 274, z: 91 },
            },
        ],
    },
};
