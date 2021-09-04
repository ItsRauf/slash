import React, {useState, useEffect} from "../../_snowpack/pkg/react.js";
import {Box, Input, Text} from "../../_snowpack/pkg/@chakra-ui/react.js";
function BaseInput({title, placeholder, setter}) {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (value) {
      setter(value);
    } else {
      setter(void 0);
    }
  }, [value]);
  const handleChange = (event) => setValue(event.target.value);
  return /* @__PURE__ */ React.createElement(Box, {
    pb: "4"
  }, /* @__PURE__ */ React.createElement(Text, {
    fontSize: "xl",
    mb: "8px"
  }, title, ":"), /* @__PURE__ */ React.createElement(Input, {
    value,
    onChange: handleChange,
    placeholder,
    size: "md"
  }));
}
export default BaseInput;
