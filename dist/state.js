import create from "../_snowpack/pkg/zustand.js";
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
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["Mentionable"] = 9] = "Mentionable";
  ApplicationCommandOptionType2[ApplicationCommandOptionType2["Number"] = 10] = "Number";
})(ApplicationCommandOptionType || (ApplicationCommandOptionType = {}));
export const useCommandStore = create((set, get) => ({
  update: (key, val) => {
    set((state) => ({...state, [key]: val}));
  },
  addOption: (option) => {
    set((state) => ({...state, options: [...state.options ?? [], option]}));
  },
  removeOption: (key) => {
    set((state) => ({
      ...state,
      options: state.options.filter((opt) => opt.key !== key)
    }));
  },
  updateOption: (option) => {
    set((state) => ({
      ...state,
      options: [
        ...state.options.filter((opt) => opt.key !== option.key),
        option
      ]
    }));
  },
  getCleanedCommandJSON: () => {
    const command = get();
    const mutableCommand = {...command};
    if (mutableCommand.options) {
      if (mutableCommand.options.length >= 1) {
        mutableCommand.options = mutableCommand.options.map((opt) => ({
          ...opt,
          options: opt.options?.map((opt2) => ({
            ...opt2,
            options: opt2.options?.map((opt3) => ({
              ...opt3,
              choices: opt3.choices?.map((c) => ({...c, key: void 0})),
              key: void 0
            })),
            choices: opt2.choices?.map((c) => ({...c, key: void 0})),
            key: void 0
          })),
          choices: opt.choices?.map((c) => ({...c, key: void 0})),
          key: void 0
        }));
      } else
        mutableCommand.options = void 0;
    }
    return JSON.stringify(mutableCommand, null, 2);
  }
}));
export const useOptionElementStore = create((set) => ({
  elements: [],
  addElement: (element) => {
    set((state) => ({...state, elements: [...state.elements, element]}));
  },
  removeElement: (key) => {
    set((state) => ({
      ...state,
      elements: state.elements.filter((elem) => elem.key !== key)
    }));
  }
}));
