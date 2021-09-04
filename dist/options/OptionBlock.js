import {
  Box,
  Button,
  Checkbox,
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
import {nanoid} from "../../_snowpack/pkg/nanoid.js";
import Choice from "./Choice.js";
function OptionBlock({type, _key, inSubCommand, setters}) {
  const Icon = Icons[type];
  const removeElement = useOptionElementStore((state) => state.removeElement);
  const addOption = useCommandStore((state) => state.addOption);
  const removeOption = useCommandStore((state) => state.removeOption);
  const updateOption = useCommandStore((state) => state.updateOption);
  const removeOptionElement = () => {
    if (inSubCommand) {
      setters?.removeOption(_key);
      setters?.removeElement(_key);
    } else {
      removeOption(_key);
      removeElement(_key);
    }
  };
  const [option, setOption] = useState({
    key: _key,
    type: ApplicationCommandOptionType[type],
    name: "",
    description: ""
  });
  useEffect(() => {
    inSubCommand ? setters?.addOption(option) : addOption(option);
  }, []);
  useEffect(() => {
    inSubCommand ? setters?.updateOption(option) : updateOption(option);
  }, [option]);
  const updateLocalOption = (opt) => {
    setOption((option2) => ({...option2, ...opt}));
  };
  const [choiceElements, setChoiceElements] = useState([]);
  const addChoice = () => {
    const key = nanoid();
    const addChoice2 = (choice) => {
      setOption((option2) => ({
        ...option2,
        choices: [...option2.choices ?? [], choice]
      }));
    };
    const updateChoice = (choice) => {
      setOption((option2) => ({
        ...option2,
        choices: [
          ...(option2.choices ?? []).filter((c) => c.key !== choice.key),
          choice
        ]
      }));
    };
    const deleteChoice = (key2) => {
      setOption((option2) => ({
        ...option2,
        choices: (option2.choices ?? []).filter((c) => c.key !== key2)
      }));
      setChoiceElements((elems) => elems.filter((elem) => elem.key !== key2));
    };
    setChoiceElements((elems) => [
      ...elems,
      /* @__PURE__ */ React.createElement(Choice, {
        key,
        _key: key,
        addChoice: addChoice2,
        updateChoice,
        deleteChoice
      })
    ]);
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
    boxSize: 6
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
  }), /* @__PURE__ */ React.createElement(Checkbox, {
    size: "lg",
    colorScheme: "blue",
    onChange: (e) => updateLocalOption({
      required: e.target.checked ? true : void 0
    })
  }, "Required"), /* @__PURE__ */ React.createElement(Button, {
    mx: "1",
    mt: "4",
    w: "32",
    colorScheme: "blue",
    onClick: addChoice
  }, "Add Choice")))), /* @__PURE__ */ React.createElement(Box, {
    ml: "8"
  }, /* @__PURE__ */ React.createElement(Wrap, null, choiceElements)));
}
export default OptionBlock;
