export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup,
  String,
  Integer,
  Boolean,
  User,
  Channel,
  Role,
  Mentionable,
}

export interface ApplicationCommandOptionChoice {
  name: string;
  value: string | number;
}

export interface ApplicationCommandOption {
  key?: string;
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
}

export interface ApplicationCommand {
  [key: string]: any;
}

export class ApplicationCommand {
  public name: string;
  public description: string;
  public options?: ApplicationCommandOption[];
  constructor() {
    this.name = '';
    this.description = '';
  }
}
