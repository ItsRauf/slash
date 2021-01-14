export var ApplicationCommandOptionType;
(function(ApplicationCommandOptionType2) {
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["SubCommand"] = 1] = "SubCommand";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["SubCommandGroup"] = 2] = "SubCommandGroup";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["String"] = 3] = "String";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["Integer"] = 4] = "Integer";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["Boolean"] = 5] = "Boolean";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["User"] = 6] = "User";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["Channel"] = 7] = "Channel";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["Role"] = 8] = "Role";
})(ApplicationCommandOptionType || (ApplicationCommandOptionType = {}));
export class ApplicationCommand {
  constructor() {
    this.name = "";
    this.description = "";
  }
}
