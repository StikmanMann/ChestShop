import "Bedwars/CustomItems/Tnt";
import "Bedwars/BedwarsPlayerFunctions";
import "Bedwars/CustomItems/PlayerTracker";
import "Bedwars/CustomItems/ExplosionResistantGlass";
import "Bedwars/Teams/TeamDamage";
import "Bedwars/ChestShop/Categories/Catergorie";
import {
  Player,
  PlayerBreakBlockBeforeEventSignal,
  Vector3,
  world,
} from "@minecraft/server";
import { MapParser } from "MapParser/loadMap";
import { largeMap } from "MapParser/BedwarsMaps/BedwarsMaps";

export interface IBedwarsData {
  playerPlacedBlockLocations: Set<string>;
  teams: {
    teamName: string;
    playerAmount: number;
    players: Player[];
    spawnPoints: Vector3[];
  }[];
}
