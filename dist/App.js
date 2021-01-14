import {Card, Layout, Space} from "../web_modules/antd.js";
import {finalCommandState, finalOptionElementState} from "./recoil/index.js";
import CodeBlock2 from "./components/CodeBlock.js";
import OptionsModal2 from "./components/OptionsModal.js";
import React from "../web_modules/react.js";
import ValueInput2 from "./components/ValueInput.js";
import {useRecoilValue} from "../web_modules/recoil.js";
function Heading() {
  return /* @__PURE__ */ React.createElement(Layout.Header, null, /* @__PURE__ */ React.createElement("h2", null, "Rauf's Slash Command Generator"));
}
function App() {
  return /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(Heading, null), /* @__PURE__ */ React.createElement(Layout.Content, {
    style: {padding: "10px"}
  }, /* @__PURE__ */ React.createElement(Space, {
    direction: "vertical",
    style: {width: "100%"},
    size: 24
  }, /* @__PURE__ */ React.createElement(Space, {
    direction: "vertical",
    style: {width: "100%"}
  }, /* @__PURE__ */ React.createElement(Card, {
    bordered: false
  }, /* @__PURE__ */ React.createElement(Space, {
    direction: "vertical",
    style: {width: "100%"}
  }, /* @__PURE__ */ React.createElement(ValueInput2, {
    keyName: "name"
  }), /* @__PURE__ */ React.createElement(ValueInput2, {
    keyName: "description"
  }))), useRecoilValue(finalOptionElementState), /* @__PURE__ */ React.createElement(OptionsModal2, null)), /* @__PURE__ */ React.createElement(CodeBlock2, {
    code: useRecoilValue(finalCommandState)
  }))));
}
export default App;
