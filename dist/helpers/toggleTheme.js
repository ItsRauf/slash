import React from "../../_snowpack/pkg/react.js";
import {IconButton, useColorMode} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {MoonIcon, SunIcon} from "../../_snowpack/pkg/@chakra-ui/icons.js";
function ThemeToggle() {
  const {colorMode, toggleColorMode} = useColorMode();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: toggleColorMode,
    "aria-label": "Toggle Theme",
    icon: colorMode === "light" ? /* @__PURE__ */ React.createElement(SunIcon, null) : /* @__PURE__ */ React.createElement(MoonIcon, null)
  }));
}
export default ThemeToggle;
