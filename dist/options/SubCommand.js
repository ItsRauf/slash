import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
  Wrap
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {
  ApplicationCommandOptionType,
  useOptionElementStore,
  useCommandStore
} from "../state.js";
import Icons from "../icons.js";
import BaseInput from "./BaseInput.js";
import {getIcon} from "./addOption.js";
import {nanoid} from "../../_snowpack/pkg/nanoid.js";
import OptionBlock from "./OptionBlock.js";
function SubCommand({type, _key, inGroup, setters}) {
  const Icon = Icons.SubCommand;
  const removeElement = useOptionElementStore((state) => state.removeElement);
  const addOption = useCommandStore((state) => state.addOption);
  const removeOption = useCommandStore((state) => state.removeOption);
  const updateOption = useCommandStore((state) => state.updateOption);
  const removeOptionElement = () => {
    if (inGroup) {
      setters?.removeOption(_key);
      setters?.removeElement(_key);
    } else {
      removeOption(_key);
      removeElement(_key);
    }
  };
  const optionNames = Object.values(ApplicationCommandOptionType).filter((value) => typeof value === "string");
  const [option, setOption] = useState({
    key: _key,
    type: ApplicationCommandOptionType.SubCommand,
    name: "",
    description: "",
    options: []
  });
  const [optionElements, setOptionElements] = useState([]);
  const addOptionElement = (type2) => {
    const elemKey = nanoid();
    const setters2 = {
      addOption: (option2) => {
        setOption((opt) => ({
          ...opt,
          options: [...opt.options ?? [], option2]
        }));
      },
      removeElement: (key) => {
        setOptionElements((elems) => elems.filter((elem) => elem.key !== key));
      },
      removeOption: (key) => {
        setOption((opt) => ({
          ...opt,
          options: (opt.options ?? []).filter((o) => o.key !== key)
        }));
      },
      updateOption: (option2) => {
        setOption((opt) => ({
          ...opt,
          options: [
            ...(opt.options ?? []).filter((o) => o.key !== option2.key),
            option2
          ]
        }));
      }
    };
    setOptionElements((elems) => [
      ...elems,
      /* @__PURE__ */ React.createElement(OptionBlock, {
        type: type2,
        key: elemKey,
        _key: elemKey,
        inSubCommand: true,
        setters: setters2
      })
    ]);
  };
  useEffect(() => {
    inGroup ? setters?.addOption(option) : addOption(option);
  }, []);
  useEffect(() => {
    inGroup ? setters?.updateOption(option) : updateOption(option);
  }, [option]);
  const updateLocalOption = (opt) => {
    setOption({
      ...option,
      ...opt
    });
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
    boxShadow: useColorModeValue("lg", "dark-lg"),
    p: "6",
    my: "4",
    rounded: "md"
  }, /* @__PURE__ */ React.createElement(VStack, {
    spacing: 2
  }, /* @__PURE__ */ React.createElement(HStack, {
    spacing: "2",
    w: "full"
  }, /* @__PURE__ */ React.createElement(Icon, {
    boxSize: 6,
    mt: "1"
  }), /* @__PURE__ */ React.createElement(Text, null, type), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(CloseButton, {
    size: "md",
    onClick: removeOptionElement
  })), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    w: "full"
  }, /* @__PURE__ */ React.createElement(BaseInput, {
    title: "Name",
    placeholder: "Option Name",
    setter: (name) => updateLocalOption({name})
  }), /* @__PURE__ */ React.createElement(BaseInput, {
    title: "Description",
    placeholder: "Option Description",
    setter: (description) => updateLocalOption({description})
  })), /* @__PURE__ */ React.createElement(Wrap, {
    spacing: "2",
    w: "full"
  }, optionNames.filter((o) => !o.includes("SubCommand")).map((val) => /* @__PURE__ */ React.createElement(Button, {
    m: "1",
    leftIcon: getIcon(val),
    onClick: () => addOptionElement(val),
    key: val
  }, val))))), /* @__PURE__ */ React.createElement(Box, {
    ml: "8"
  }, optionElements));
}
export default SubCommand;
