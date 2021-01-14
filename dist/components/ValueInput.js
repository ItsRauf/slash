import {Form, Input, Typography} from "../../web_modules/antd.js";
import React, {useState} from "../../web_modules/react.js";
import validate2 from "../helpers/validate.js";
import {commandState} from "../recoil/index.js";
import {useRecoilState} from "../../web_modules/recoil.js";
function ValueInput({keyName}) {
  const [command, setCommand] = useRecoilState(commandState);
  const [validation, setValidation] = useState({status: ""});
  function updateCommandKey(e) {
    const [isValid, validationData] = validate2(keyName, e.target.value, 3);
    setValidation(validationData);
    if (isValid) {
      setCommand({...command, [keyName]: e.target.value});
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography.Title, {
    level: 5,
    style: {textTransform: "capitalize"}
  }, keyName, ":"), /* @__PURE__ */ React.createElement(Form.Item, {
    hasFeedback: true,
    validateStatus: validation.status,
    help: validation.message
  }, /* @__PURE__ */ React.createElement(Input, {
    allowClear: true,
    size: "large",
    placeholder: `Command ${keyName}...`,
    value: command[keyName],
    onChange: updateCommandKey
  })));
}
export default ValueInput;
