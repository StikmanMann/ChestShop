import { ItemLockMode, ItemStack } from "@minecraft/server";

const leatherChestplate = new ItemStack("minecraft:leather_chestplate");

leatherChestplate.getComponent("dyeable").color = { blue: 0, green: 0, red: 0 };
