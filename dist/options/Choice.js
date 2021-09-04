import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  VStack
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import BaseInput from "./BaseInput.js";
import {Choice as ChoiceIcon} from "../icons.js";
function Choice({_key, addChoice, deleteChoice, updateChoice}) {
  const [choice, setChoice] = useState({
    key: _key,
    name: "",
    value: ""
  });
  useEffect(() => {
    addChoice(choice);
  }, []);
  useEffect(() => {
    updateChoice(choice);
  }, [choice]);
  const updateLocalChoice = (c) => {
    setChoice((choice2) => ({...choice2, ...c}));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
    boxShadow: useColorModeValue("lg", "dark-lg"),
    p: "6",
    my: "4",
    rounded: "md",
    w: "sm"
  }, /* @__PURE__ */ React.createElement(VStack, {
    spacing: 2
  }, /* @__PURE__ */ React.createElement(HStack, {
    spacing: "2",
    w: "full"
  }, /* @__PURE__ */ React.createElement(ChoiceIcon, {
    boxSize: 6
  }), /* @__PURE__ */ React.createElement(Text, null, "Choice"), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(CloseButton, {
    onClick: () => deleteChoice(_key)
  })), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    w: "full"
  }, /* @__PURE__ */ React.createElement(BaseInput, {
    title: "Name",
    placeholder: "Choice Name",
    setter: (name) => updateLocalChoice({name})
  }), /* @__PURE__ */ React.createElement(BaseInput, {
    title: "Value",
    placeholder: "Choice Value",
    setter: (value) => updateLocalChoice({value: isNaN(+value) ? value : +value})
  })))));
}
export default Choice;
