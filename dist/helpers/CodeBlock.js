import React from "../../_snowpack/pkg/react.js";
import {
  Button,
  Code,
  Flex,
  Spacer,
  useClipboard,
  useColorMode
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import Highlight, {defaultProps} from "../../_snowpack/pkg/prism-react-renderer.js";
import nightowl from "../../_snowpack/pkg/prism-react-renderer/themes/nightowl.js";
import nightowlLight from "../../_snowpack/pkg/prism-react-renderer/themes/nightOwlLight.js";
import {CopyIcon} from "../../_snowpack/pkg/@chakra-ui/icons.js";
function CodeBlock({code}) {
  const {colorMode} = useColorMode();
  const {onCopy, hasCopied} = useClipboard(code);
  return /* @__PURE__ */ React.createElement(Code, {
    display: "block",
    whiteSpace: "pre",
    flexGrow: 1,
    p: "4",
    my: "4"
  }, /* @__PURE__ */ React.createElement(Highlight, {
    ...defaultProps,
    theme: colorMode === "dark" ? nightowl : nightowlLight,
    code,
    language: "json"
  }, ({className, tokens, getLineProps, getTokenProps}) => /* @__PURE__ */ React.createElement("pre", {
    className
  }, tokens.map((line, i) => /* @__PURE__ */ React.createElement("div", {
    ...getLineProps({line, key: i})
  }, line.map((token, key) => /* @__PURE__ */ React.createElement("span", {
    ...getTokenProps({token, key})
  })))))), /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Button, {
    leftIcon: /* @__PURE__ */ React.createElement(CopyIcon, null),
    onClick: onCopy
  }, hasCopied ? "Copied" : "Copy")));
}
export default CodeBlock;
