import {
  PlayerBreakBlockBeforeEvent,
  PlayerBreakBlockBeforeEventSignal,
  PlayerPlaceBlockBeforeEvent,
  system,
  world,
} from "@minecraft/server";
import { IBedwarsData } from "./BedwarsMain";
import { workerData } from "worker_threads";
import { json } from "stream/consumers";
import { EGameMode, IMapData } from "MapParser/loadMap";
import { VectorFunctions } from "staticScripts/vectorFunctions";
import { AwaitFunctions } from "staticScripts/awaitFunctions";

export const bedwarsBlockBreak =
  (data: IMapData<EGameMode.BEDWARS>) =>
  (eventData: PlayerBreakBlockBeforeEvent) => {
    if (!data.players.includes(eventData.player)) {
      return;
    }
    //world.sendMessage(JSON.stringify(data));
    const locationString = JSON.stringify(eventData.block.location);
    /*     world.sendMessage("Checking location:" + locationString);
    world.sendMessage(
      "Set contents:" +
        JSON.stringify(Array.from(data.playerPlacedBlockLocations))
    ); */

    // Check if location is in the Set
    if (!data.gameModeData.playerPlacedBlockLocations.has(locationString)) {
      eventData.player.sendMessage(
        "§l§c» §r§cYou can only break blocks placed by players!"
      );
      eventData.cancel = true;
      system.run(async () => {
        let playerLoc = eventData.player.location;
        let blockLoc = eventData.block.location;
        if (playerLoc.y > blockLoc.y) {
          if (
            playerLoc.x % 1 > 0.3 &&
            playerLoc.x % 1 < 0.7 &&
            playerLoc.z % 1 > 0.3 &&
            playerLoc.z % 1 < 0.7
          ) {
            await AwaitFunctions.waitTicks(3);
            world.sendMessage("Panicking due to palyer falling");
            eventData.player.teleport(
              VectorFunctions.addVector(eventData.player.location, {
                x: 0,
                y: 0.25,
                z: 0,
              })
            );
          }
        }
      });
    }
  };

export const bedwarsPlayerPlace =
  (data: IBedwarsData) => (eventData: PlayerPlaceBlockBeforeEvent) => {
    data.playerPlacedBlockLocations.add(
      JSON.stringify(eventData.block.location)
    );
    /*     for (const [key, value] of data.playerPlacedBlockLocations.entries()) {
      world.sendMessage(JSON.stringify(key));
    } */
  };
