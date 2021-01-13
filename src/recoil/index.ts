import { atom, selector } from 'recoil';

import type { ApplicationCommand } from 'src/slash/ApplicationCommand';
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
    command.options = command.options?.map((opt) => ({
      ...opt,
      key: undefined,
    }));
    if (command.options?.length === 0) command.options = undefined;
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
