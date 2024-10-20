import { Player, world } from "@minecraft/server";
import { givePlayerKit } from "./Kit";
import { pickaxeLevels } from "./PickaxeLevels";
import { axeLevels } from "./AxeLevels";
import { armorLevels } from "./ArmorLevels";
// Define properties on hypixelValues object
//#region Functions
Player.prototype.givePlayerKit = function () {
    givePlayerKit(this);
};
Player.prototype.getPickaxeLevel = function () {
    if (this.getDynamicProperty("pickaxeLevel") === undefined) {
        this.setDynamicProperty("pickaxeLevel", 0);
    }
    return this.getDynamicProperty("pickaxeLevel");
};
Player.prototype.setPickaxeLevel = function (level) {
    world.sendMessage("Setting pickaxe level to " + level);
    if (level > pickaxeLevels.length - 1) {
        world.sendMessage("Max pickaxe level reached");
        return;
    }
    this.setDynamicProperty("pickaxeLevel", level);
};
Player.prototype.getAxeLevel = function () {
    if (this.getDynamicProperty("axeLevel") === undefined) {
        this.setDynamicProperty("axeLevel", 0);
    }
    return this.getDynamicProperty("axeLevel");
};
Player.prototype.setAxeLevel = function (level) {
    world.sendMessage("Setting axe level to " + level);
    if (level > axeLevels.length - 1) {
        world.sendMessage("Max axe level reached");
        return;
    }
    this.setDynamicProperty("axeLevel", level);
};
Player.prototype.setArmorLevel = function (level) {
    world.sendMessage("Setting armor level to " + level);
    if (level > armorLevels.length - 1) {
        world.sendMessage("Max armor level reached");
        return;
    }
    this.setDynamicProperty("armorLevel", level);
};
Player.prototype.getArmorLevel = function () {
    if (this.getDynamicProperty("armorLevel") === undefined) {
        this.setDynamicProperty("armorLevel", 0);
    }
    return this.getDynamicProperty("armorLevel");
};
//#endregion
