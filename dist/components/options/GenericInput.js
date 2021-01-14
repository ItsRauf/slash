import {Form, Input, Typography} from "../../../web_modules/antd.js";
import React, {useEffect, useState} from "../../../web_modules/react.js";
import validate2 from "../../helpers/validate.js";
function GenericInput({name, setter}) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const [option, setOption] = setter;
    setOption({...option, [name]: value});
  }, [value]);
  const [validation, setValidation] = useState({
    status: ""
  });
  function updateValue(e) {
    const [isValid, validationData] = validate2(name, e.target.value, 1);
    setValidation(validationData);
    if (isValid) {
      setValue(e.target.value);
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography.Title, {
    level: 5,
    style: {textTransform: "capitalize"}
  }, name, ":"), /* @__PURE__ */ React.createElement(Form.Item, {
    hasFeedback: true,
    validateStatus: validation.status,
    help: validation.message
  }, /* @__PURE__ */ React.createElement(Input, {
    allowClear: true,
    size: "large",
    placeholder: `Option ${name}...`,
    value,
    onChange: updateValue
  })));
}
export default GenericInput;
