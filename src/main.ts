import { Player, world, system } from "@minecraft/server";

/** 
//Pre load
    //Map Data
    import "MapParser/Bridge Maps/brideMaps"

    //Player Functions
    import "hypixelFunctions/playerFunctions"
    import "staticScripts/inventoryFunctions"
    import "MapParser/mapList"
    import "hypixelFunctions/playerSettings"
//Other
import "gameCreator/lobbyManager"
import "hypixelFunctions/partySystem"
import "hypixelFunctions/playerSpawnHandler"
import "./betterChat";
import "./Bridge/bridge";
import "./Bridge/BridgeWorld"
//import "./worldEdit/mainEdit";
import "./hypixelCosmetic/particleEffects"
import "./hypixelCosmetic/cosmeticInventory"
import "./npc/npcInteract"
import "./hypixelFunctions/adminFunctions"
import "./staticScripts/Logger"
import { Logger } from "./staticScripts/Logger";
import "./customName"
import "./MapParser/loadMap"

*/

//Preload Settings
//import "ChaosMod/ChaosEventSettings";#

//Player Functions

import "Bedwars/BedwarsMain";

//ChaosManager
import "Bedwars/ChestShop/ChestShopMain";

//Better Chat
import "betterChat";

import { Logger } from "staticScripts/Logger";

Logger.warn("Chest script running!", "ChestShop");

//import "Ollama/mainOllama";