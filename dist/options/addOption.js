import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {nanoid} from "../../_snowpack/pkg/nanoid.js";
import React from "../../_snowpack/pkg/react.js";
import Icons from "../icons.js";
import {
  ApplicationCommandOptionType,
  useCommandStore,
  useOptionElementStore
} from "../state.js";
import OptionBlock from "./OptionBlock.js";
import SubCommand from "./SubCommand.js";
import SubCommandGroup from "./SubCommandGroup.js";
export function getIcon(name) {
  const Icon = Icons[name];
  return /* @__PURE__ */ React.createElement(Icon, {
    boxSize: 6
  });
}
function AddOption() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const options = useCommandStore((state) => state.options);
  const optionNames = Object.values(ApplicationCommandOptionType).filter((value) => typeof value === "string");
  const addElement = useOptionElementStore((state) => state.addElement);
  const addOptionElement = (type) => {
    const elemKey = nanoid();
    switch (type) {
      case "SubCommand":
        addElement(/* @__PURE__ */ React.createElement(SubCommand, {
          type,
          key: elemKey,
          _key: elemKey
        }));
        break;
      case "SubCommandGroup":
        addElement(/* @__PURE__ */ React.createElement(SubCommandGroup, {
          type,
          key: elemKey,
          _key: elemKey
        }));
        break;
      default:
        addElement(/* @__PURE__ */ React.createElement(OptionBlock, {
          type,
          key: elemKey,
          _key: elemKey
        }));
        break;
    }
    return onClose();
  };
  const isDisabled = (type) => {
    const optNames = options?.map((opt) => ApplicationCommandOptionType[opt.type]);
    if (optNames && optNames.length > 0 && optNames.find((o) => o.includes("SubCommand")) && !type.includes("SubCommand"))
      return true;
    if (optNames && optNames.length > 0 && !optNames.find((o) => o.includes("SubCommand")) && type.includes("SubCommand"))
      return true;
    return false;
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    w: "32",
    mb: "4",
    colorScheme: "blue",
    onClick: onOpen
  }, "Add Option"), /* @__PURE__ */ React.createElement(Modal, {
    isOpen,
    onClose,
    size: "xl"
  }, /* @__PURE__ */ React.createElement(ModalOverlay, null), /* @__PURE__ */ React.createElement(ModalContent, null, /* @__PURE__ */ React.createElement(ModalHeader, null, "Add Option"), /* @__PURE__ */ React.createElement(ModalCloseButton, null), /* @__PURE__ */ React.createElement(ModalBody, null, optionNames.map((val) => /* @__PURE__ */ React.createElement(Button, {
    m: "1",
    leftIcon: getIcon(val),
    onClick: () => addOptionElement(val),
    key: val,
    disabled: isDisabled(val)
  }, val))), /* @__PURE__ */ React.createElement(ModalFooter, null))));
}
export default AddOption;
