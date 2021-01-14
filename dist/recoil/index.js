import {atom, selector} from "../../web_modules/recoil.js";
export const commandState = atom({
  key: "commandState",
  default: {}
});
export const finalCommandState = selector({
  key: "finalCommandState",
  get: ({get}) => {
    const data = get(commandState);
    const command = {...data};
    if (command.options) {
      command.options = command.options.map((opt) => ({
        ...opt,
        key: void 0
      }));
      if (command.options.length === 0)
        command.options = void 0;
    }
    return JSON.stringify(command, null, 2);
  }
});
export const optionElementState = atom({
  key: "optionElementState",
  default: []
});
export const finalOptionElementState = selector({
  key: "finalOptionElementState",
  get: ({get}) => {
    return get(optionElementState);
  }
});
