import {
  ApplicationCommandOptionType
} from "../../slash/ApplicationCommand.js";
import {Button, Card, Col, Row, Space} from "../../../web_modules/antd.js";
import React, {useEffect, useState} from "../../../web_modules/react.js";
import {commandState, optionElementState} from "../../recoil/index.js";
import GenericInput2 from "./GenericInput.js";
import Icons from "../../icons/index.js";
import SubCommand2 from "./SubCommand.js";
import keyofEnum2 from "../../helpers/keyofEnum.js";
import {useRecoilState} from "../../../web_modules/recoil.js";
function SubCommandGroup({type, index}) {
  const [option, setOption] = useState({
    key: `${ApplicationCommandOptionType[type]}Option-${index}`,
    type,
    name: "",
    description: "",
    options: []
  });
  const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    if (command.options) {
      setCommand({
        ...command,
        options: [
          ...command.options.filter((o) => o.key !== option.key),
          {
            ...option,
            options: option.options?.map((o) => ({
              ...o,
              key: void 0
            }))
          }
        ]
      });
    }
  }, [option]);
  const [optionElements, setOptionElements] = useRecoilState(optionElementState);
  function deleteOption() {
    if (command.options) {
      setCommand({
        ...command,
        options: command.options.filter((o) => o.key !== option.key)
      });
    }
    setOptionElements(optionElements.filter((elem) => elem.key !== option.key));
  }
  const [childOptionElements, setChildOptionElements] = useState([]);
  function updateChildOption(val) {
    setOption((prev) => ({
      ...prev,
      options: [
        ...(prev.options ?? []).filter((o) => {
          return o.key !== val.key;
        }),
        val
      ]
    }));
  }
  function deleteChildOption(key) {
    setChildOptionElements((prev) => prev.filter((elem) => elem.key !== key));
    setOption((prev) => ({
      ...prev,
      options: prev.options?.filter((o) => o.key !== key)
    }));
  }
  function addChildOption(e) {
    const ts = Date.now();
    const childOption = {
      key: `${ApplicationCommandOptionType[parseInt(e.currentTarget.id)]}Option-${ts}`,
      type: parseInt(e.currentTarget.id),
      name: "",
      description: "",
      options: []
    };
    setOption({
      ...option,
      options: [...option.options ?? [], childOption]
    });
    setChildOptionElements([
      ...childOptionElements,
      /* @__PURE__ */ React.createElement(SubCommand2, {
        key: `${ApplicationCommandOptionType[parseInt(e.currentTarget.id)]}Option-${ts}`,
        type: parseInt(e.currentTarget.id),
        index: ts,
        inGroup: true,
        deleter: deleteChildOption,
        updater: updateChildOption,
        className: "subCommandChild"
      })
    ]);
  }
  const OptionNames = keyofEnum2(ApplicationCommandOptionType);
  const SubCommandOpt = OptionNames.splice(0, 1);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Card, {
    title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Row, {
      gutter: 16,
      align: "middle",
      justify: "start"
    }, /* @__PURE__ */ React.createElement(Col, null, Icons[ApplicationCommandOptionType[type]]), /* @__PURE__ */ React.createElement(Col, null, ApplicationCommandOptionType[type]))),
    bordered: false
  }, /* @__PURE__ */ React.createElement(Space, {
    direction: "vertical",
    style: {width: "100%"}
  }, /* @__PURE__ */ React.createElement(GenericInput2, {
    name: "name",
    setter: [option, setOption]
  }), /* @__PURE__ */ React.createElement(GenericInput2, {
    name: "description",
    setter: [option, setOption]
  }), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, {
    flex: "auto"
  }, /* @__PURE__ */ React.createElement(Row, {
    align: "middle",
    justify: "start"
  }, /* @__PURE__ */ React.createElement(Space, {
    align: "center"
  }, SubCommandOpt.map((val) => /* @__PURE__ */ React.createElement(Button, {
    key: val,
    id: ApplicationCommandOptionType[val],
    onClick: addChildOption,
    size: "large",
    type: "primary"
  }, /* @__PURE__ */ React.createElement(Row, {
    gutter: 8,
    align: "middle",
    justify: "space-around"
  }, /* @__PURE__ */ React.createElement(Col, null, Icons[val]), /* @__PURE__ */ React.createElement(Col, null, val))))))), /* @__PURE__ */ React.createElement(Col, {
    flex: "auto"
  }, /* @__PURE__ */ React.createElement(Row, {
    align: "middle",
    justify: "end"
  }, /* @__PURE__ */ React.createElement(Space, {
    align: "center"
  }, /* @__PURE__ */ React.createElement(Button, {
    danger: true,
    type: "primary",
    size: "large",
    onClick: deleteOption
  }, "Delete"))))))), /* @__PURE__ */ React.createElement(Space, {
    direction: "vertical",
    style: {width: "100%", paddingBottom: "10px"}
  }, childOptionElements));
}
export default SubCommandGroup;
