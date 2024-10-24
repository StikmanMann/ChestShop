import { EquipmentSlot, ItemStack, world, } from "@minecraft/server";
export const knockbackWhip = new ItemStack("minecraft:lead");
knockbackWhip.nameTag = "§r§fKnockback Whip";
knockbackWhip.setLore(["§r§l§f5x Iron"]);
world.afterEvents.entityHurt.subscribe((eventData) => {
    if (eventData.damageSource.damagingEntity == null)
        return;
    const item = eventData.damageSource.damagingEntity
        .getComponent("equippable")
        .getEquipmentSlot(EquipmentSlot.Mainhand);
    if (item.typeId == knockbackWhip.typeId) {
        world.sendMessage("Knockback whip hit");
    }
});
