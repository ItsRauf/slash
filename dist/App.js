import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import {Flex, Heading, Spacer, VStack} from "../_snowpack/pkg/@chakra-ui/react.js";
import ThemeToggle from "./helpers/toggleTheme.js";
import {useCommandStore, useOptionElementStore} from "./state.js";
import BaseInput from "./options/BaseInput.js";
import AddOption from "./options/addOption.js";
import CodeBlock from "./helpers/CodeBlock.js";
function App() {
  const optionElements = useOptionElementStore((state) => state.elements);
  const commandStore = useCommandStore();
  const getCleanedCommandJSON = useCommandStore((state) => state.getCleanedCommandJSON);
  const [output, setOutput] = useState(getCleanedCommandJSON());
  const update = useCommandStore((state) => state.update);
  useEffect(() => {
    setOutput(getCleanedCommandJSON());
  }, [commandStore]);
  return /* @__PURE__ */ React.createElement(VStack, {
    px: "8"
  }, /* @__PURE__ */ React.createElement(Flex, {
    w: "full",
    py: "4"
  }, /* @__PURE__ */ React.createElement(Heading, {
    as: "h3",
    size: "lg"
  }, "Rauf's Slash Command Generator"), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(ThemeToggle, null)), /* @__PURE__ */ React.createElement(Flex, {
    direction: "column",
    w: "full",
    h: "full"
  }, /* @__PURE__ */ React.createElement(BaseInput, {
    title: "Name",
    placeholder: "Command Name",
    setter: (val) => update("name", val)
  }), /* @__PURE__ */ React.createElement(BaseInput, {
    title: "Description",
    placeholder: "Command Description",
    setter: (val) => update("description", val)
  }), /* @__PURE__ */ React.createElement(AddOption, null), /* @__PURE__ */ React.createElement(Spacer, null), optionElements, /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(CodeBlock, {
    code: output
  })));
}
export default App;
