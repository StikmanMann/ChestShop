import { Player, system, world } from "@minecraft/server";
import { addCommand } from "staticScripts/commandFunctions";

type TeamColorType = {
  red: string;
  blue: string;
  green: string;
  yellow: string;
  pink: string;
  purple: string;
  black: string;
  white: string;
};

const validColors: (keyof TeamColorType)[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "purple",
  "black",
  "white",
];

const teamColorToBlock: Map<string, string> = new Map([
  ["red", "red"],
  ["blue", "light_blue"],
  ["green", "lime"],
  ["yellow", "yellow"],
  ["pink", "pink"],
  ["purple", "purple"],
  ["black", "black"],
  ["white", "white"],
]);

const teamColorNames: Map<string, string> = new Map([
  ["red", "§c"],
  ["blue", "§9"],
  ["green", "§a"],
  ["yellow", "§e"],
  ["pink", "§d"],
  ["purple", "§5"],
  ["black", "§8"],
  ["white", "§f"],
]);

system.run(() => {
  for (const player of world.getPlayers()) {
    player.nameTag = player.name;
  }
});

export class BedwarsTeam {
  static setPlayerColor(player: Player, color: keyof TeamColorType) {
    player.setDynamicProperty("color", color);
    let name = player.nameTag;
    if (name.includes("§")) {
      let index = name.indexOf("§", 2);
      name = name.slice(index + 2);
    }
    const newName = `§l${teamColorNames.get(color)}${name}`;
    player.nameTag = newName;
    world.sendMessage("New Name: " + newName);
  }

  static getBlockColor(player: Player): string {
    const color = player.getDynamicProperty("color") as string;

    // Check if the color is one of the valid keys in TeamColorType
    if (!color || !BedwarsTeam.isValidColor(color)) {
      return "white"; // Fallback to "white" if color is invalid
    }
    return teamColorToBlock.get(color);
  }

  static isValidColor(color: string): color is keyof TeamColorType {
    return validColors.includes(color as keyof TeamColorType);
  }
}

addCommand({
  commandName: "setTeamColor",
  commandPrefix: ";;",
  directory: "Bedwars",
  chatFunction: (chatSendEvent) => {
    const color = chatSendEvent.message.split(" ")[1];
    if (validColors.includes(color as keyof TeamColorType)) {
      BedwarsTeam.setPlayerColor(
        chatSendEvent.sender,
        color as keyof TeamColorType
      );
      world.sendMessage(
        "§l§e» §r§eYou have set your team color to §l§e" + color
      );
    } else {
      world.sendMessage(
        `§l§e» §r§cInvalid color. Please use ${JSON.stringify(validColors)} `
      );
      return;
    }
  },
});
