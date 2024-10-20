import { Entity, ItemStack, Player } from "@minecraft/server";
import { buyItem } from "../BuyFunctions/StandardBuyFunction";

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
