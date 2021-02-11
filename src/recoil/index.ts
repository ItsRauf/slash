import {
  ApplicationCommand,
  ApplicationCommandOptionType,
} from '../slash/ApplicationCommand';
import { atom, selector } from 'recoil';

import type { ReactNode } from 'react';

export const commandState = atom<ApplicationCommand>({
  key: 'commandState',
  default: {} as ApplicationCommand,
});

export const finalCommandState = selector({
  key: 'finalCommandState',
  get: ({ get }) => {
    const data = get(commandState);
    const command = { ...data };
    if (command.options) {
      command.options = command.options.map((opt) => ({
        ...opt,
        key: undefined,
      }));
      if (command.options.length === 0) command.options = undefined;
    }
    return JSON.stringify(command, null, 2);
  },
});

export const optionElementState = atom<ReactNode[]>({
  key: 'optionElementState',
  default: [],
});

export const finalOptionElementState = selector({
  key: 'finalOptionElementState',
  get: ({ get }) => {
    return get(optionElementState);
  },
});

export const useableOptionType = selector({
  key: 'usableOptionType',
  get: ({ get }) => {
    const command = get(commandState);
    if (
      command.options?.find(
        (opt) => opt.type === ApplicationCommandOptionType.SubCommandGroup,
      )
    )
      return 'SubCommandGroup';
    else if (
      command.options?.find(
        (opt) => opt.type === ApplicationCommandOptionType.SubCommand,
      )
    )
      return 'SubCommand';
    else if (command.options && command.options.length > 0) return 'Option';
    else return false;
  },
});
