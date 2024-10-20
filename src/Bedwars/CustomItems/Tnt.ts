import { system, world } from "@minecraft/server";

const tntNames: Set<string> = new Set();
tntNames.add("minecraft:tnt");

world.beforeEvents.playerPlaceBlock.subscribe((eventData) => {
  const block = eventData.permutationBeingPlaced.getItemStack();
  world.sendMessage("Placing block: " + block.typeId);
  if (tntNames.has(block.typeId)) {
    eventData.cancel = true;
    system.run(async () => {
      eventData.player.dimension.spawnEntity(
        "minecraft:tnt",
        eventData.block.location
      );
    });
  }
});
