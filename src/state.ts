import type { ReactNode } from 'react';
import create from 'zustand';

export enum ApplicationCommandOptionType {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11,
}

export interface ApplicationCommandOptionChoice {
  key?: string;
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
  autocomplete?: boolean;
}

export interface ApplicationCommand {
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
}

interface StateMethods {
  update<K extends keyof ApplicationCommand>(
    key: K,
    val?: ApplicationCommand[K],
  ): void;
  addOption(option: ApplicationCommandOption): void;
  updateOption(option: ApplicationCommandOption): void;
  removeOption(key: ApplicationCommandOption['key']): void;
  getCleanedCommandJSON(): string;
}

export const useCommandStore = create<
  Partial<ApplicationCommand> & StateMethods
>((set, get) => ({
  update: (key, val) => {
    set((state) => ({ ...state, [key]: val }));
  },
  addOption: (option) => {
    set((state) => ({ ...state, options: [...(state.options ?? []), option] }));
  },
  removeOption: (key) => {
    set((state) => ({
      ...state,
      options: state.options!.filter((opt) => opt.key !== key),
    }));
  },
  updateOption: (option) => {
    set((state) => ({
      ...state,
      options: [
        ...state.options!.filter((opt) => opt.key !== option.key),
        option,
      ],
    }));
  },
  getCleanedCommandJSON: () => {
    const command = get();
    const mutableCommand = { ...command };
    if (mutableCommand.options) {
      if (mutableCommand.options.length >= 1) {
        mutableCommand.options = mutableCommand.options.map((opt) => ({
          ...opt,
          options: opt.options?.map((opt) => ({
            ...opt,
            options: opt.options?.map((opt) => ({
              ...opt,
              choices: opt.choices?.map((c) => ({ ...c, key: undefined })),
              key: undefined,
            })),
            choices: opt.choices?.map((c) => ({ ...c, key: undefined })),
            key: undefined,
          })),
          choices: opt.choices?.map((c) => ({ ...c, key: undefined })),
          key: undefined,
        }));
      } else mutableCommand.options = undefined;
    }
    return JSON.stringify(mutableCommand, null, 2);
  },
}));

interface OptionElementStore {
  elements: ReactNode[];
  addElement(element: ReactNode): void;
  removeElement(key: string): void;
}

export const useOptionElementStore = create<OptionElementStore>((set) => ({
  elements: [],
  addElement: (element) => {
    set((state) => ({ ...state, elements: [...state.elements, element] }));
  },
  removeElement: (key) => {
    set((state) => ({
      ...state,
      elements: state.elements.filter((elem: any) => elem.key !== key),
    }));
  },
}));
