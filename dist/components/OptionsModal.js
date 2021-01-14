import {Button, Col, Modal, Row, Space} from "../../web_modules/antd.js";
import React, {useEffect, useState} from "../../web_modules/react.js";
import {commandState, optionElementState} from "../recoil/index.js";
import {ApplicationCommandOptionType} from "../slash/ApplicationCommand.js";
import Icons from "../icons/index.js";
import Option2 from "./options/Option.js";
import keyofEnum2 from "../helpers/keyofEnum.js";
import {useRecoilState} from "../../web_modules/recoil.js";
function OptionsModal() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [loaded]);
  const [modalVisibility, setModalVisibility] = useState(false);
  function changeModalVisibility() {
    setModalVisibility(!modalVisibility);
  }
  const [optionElements, setOptionElements] = useRecoilState(optionElementState);
  const [command, setCommand] = useRecoilState(commandState);
  function addOptionElement(e) {
    const ts = Date.now();
    setOptionElements([
      ...optionElements,
      /* @__PURE__ */ React.createElement(Option2, {
        key: `${ApplicationCommandOptionType[parseInt(e.currentTarget.id)]}Option-${ts}`,
        type: parseInt(e.currentTarget.id),
        index: ts
      })
    ]);
    if (!command.options) {
      setCommand({...command, options: []});
    }
    setModalVisibility(!modalVisibility);
  }
  const OptionNames = keyofEnum2(ApplicationCommandOptionType);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    type: "primary",
    size: "large",
    loading: !loaded,
    onClick: changeModalVisibility
  }, "Add Option"), /* @__PURE__ */ React.createElement(Modal, {
    centered: true,
    title: "Add Option",
    visible: modalVisibility,
    onCancel: changeModalVisibility,
    footer: null
  }, /* @__PURE__ */ React.createElement(Space, {
    size: 24,
    direction: "vertical",
    style: {width: "100%"}
  }, /* @__PURE__ */ React.createElement(Row, {
    gutter: 16,
    justify: "space-around",
    align: "middle"
  }, OptionNames.splice(0, 3).map((val) => /* @__PURE__ */ React.createElement(Col, {
    flex: "auto"
  }, /* @__PURE__ */ React.createElement(Button, {
    key: val,
    id: ApplicationCommandOptionType[val],
    onClick: addOptionElement,
    size: "large"
  }, /* @__PURE__ */ React.createElement(Row, {
    gutter: 8,
    align: "middle",
    justify: "space-around"
  }, /* @__PURE__ */ React.createElement(Col, null, Icons[val]), /* @__PURE__ */ React.createElement(Col, null, val)))))), /* @__PURE__ */ React.createElement(Row, {
    gutter: 16,
    justify: "space-around",
    align: "middle"
  }, OptionNames.splice(-3).map((val) => /* @__PURE__ */ React.createElement(Col, {
    flex: "auto"
  }, /* @__PURE__ */ React.createElement(Button, {
    key: val,
    id: ApplicationCommandOptionType[val],
    onClick: addOptionElement,
    size: "large"
  }, /* @__PURE__ */ React.createElement(Row, {
    gutter: 8,
    align: "middle",
    justify: "space-around"
  }, /* @__PURE__ */ React.createElement(Col, null, Icons[val]), /* @__PURE__ */ React.createElement(Col, null, val)))))))));
}
export default OptionsModal;
