import { Entity, ItemStack, Player, world } from "@minecraft/server";
import { buyItem } from "../BuyFunctions/StandardBuyFunction";
import { showHUD } from "staticScripts/commandFunctions";
import { ActionFormData } from "@minecraft/server-ui";

export interface Price {
  priceTypeId: string;
  priceAmount: number;
}

export interface ShopItem {
  getItem: (buyer: Player) => ItemStack;
  buyFunction: (
    shopEntity: Entity,
    buyer: Player,
    missingItem: ItemStack,
    price: Price
  ) => void;
  getPrice: (buyer: Player) => Price;
}

export interface Category {
  name: string;
  items: Array<ShopItem>;
}

export const categories: Map<string, Category> = new Map([
  ["Main Shop", { name: "Main Shop", items: new Array<ShopItem>(27) }],
]);

world.afterEvents.entitySpawn.subscribe(async (event) => {
  let entity = event.entity;
  if (entity.typeId !== "shop:villager_shop") {
    return;
  }
  let player = entity.dimension.getPlayers({
    closest: 1,
    maxDistance: 1,
    location: entity.location,
  })[0];

  if (!player) {
    return;
  }

  let hud = new ActionFormData()
    .title("Set Chest Shop")
    .body("Choose a category");

  let names = Array.from(categories.keys());
  for (const key of names) {
    world.sendMessage("Adding key: " + key);
    hud.button(`${key}`);
  }

  await showHUD(player, hud).then((res) => {
    if (res.canceled) {
      world.sendMessage("You need to select a category");
      entity.remove();
    }
    entity.nameTag = names[res.selection];
  });
});
