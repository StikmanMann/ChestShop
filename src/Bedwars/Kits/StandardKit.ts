import {
  DyeColor,
  EquipmentSlot,
  ItemStack,
  Player,
  world,
} from "@minecraft/server";
import { armorLevels } from "Bedwars/ArmorLevels";
import { axeLevels } from "Bedwars/AxeLevels";
import { Kit } from "Bedwars/Kit";
import { pickaxeLevels } from "Bedwars/PickaxeLevels";

import { addCommand } from "staticScripts/commandFunctions";
import { Logger } from "staticScripts/Logger";

const leatherChestplate = new ItemStack("minecraft:leather_chestplate");

for (let player of world.getAllPlayers()) {
  const item = player
    .getComponent("equippable")
    .getEquipment(EquipmentSlot.Mainhand);

  world.sendMessage(JSON.stringify(item.getComponents()));
  Logger.warn(JSON.stringify(item));
}

//leatherChestplate.getComponent("dyeable").color = { blue: 0, green: 0, red: 0 };

const giveKitFunction = (player: Player) => {
  const inventory = player.getComponent("minecraft:inventory").container;
  inventory.clearAll();
  inventory.addItem(new ItemStack("minecraft:wooden_sword"));
  let pickaxeLevel = player.getPickaxeLevel();
  if (pickaxeLevel != 0) {
    inventory.addItem(pickaxeLevels[pickaxeLevel]);
  }
  let axeLevel = player.getAxeLevel();
  if (axeLevel != 0) {
    inventory.addItem(axeLevels[axeLevel]);
  }

  //Armor
  let armorLevel = player.getArmorLevel();
  if (armorLevel != 0) {
    const armor = armorLevels[armorLevel];
    const equipment = player.getComponent("minecraft:equippable");
    if (armor.helmet != null) {
      equipment.setEquipment(EquipmentSlot.Head, armor.helmet);
    }
    if (armor.chestplate != null) {
      equipment.setEquipment(EquipmentSlot.Chest, armor.chestplate);
    }
  }

  //Leather
  inventory.addItem(leatherChestplate);
};

export const standardKit: Kit = {
  name: "Standard Kit",
  giveKitFunction: giveKitFunction,
};

addCommand({
  commandName: "kit",
  commandPrefix: ";;",
  directory: "Bedwars",
  chatFunction: (chatSendEvent) => {
    world.sendMessage("§l§e» §r§eYou have received the §l§eStandard Kit");
    chatSendEvent.sender.givePlayerKit();
  },
});
