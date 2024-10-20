import { world } from "@minecraft/server";

world.afterEvents.blockExplode.subscribe((eventData) => {
  const explodedBlock = eventData.explodedBlockPermutation;
  //world.sendMessage("Exploded block: " + explodedBlock.type.id);
  if (explodedBlock.type.id.includes("glass")) {
    eventData.dimension.setBlockPermutation(
      eventData.block.location,
      explodedBlock
    );
  }
});
