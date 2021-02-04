import __SNOWPACK_ENV__ from '../__snowpack__/env.js';
import.meta.env = __SNOWPACK_ENV__;

import "../web_modules/antd/dist/antd.dark.css.proxy.js";
import App2 from "./App.js";
import React from "../web_modules/react.js";
import ReactDOM from "../web_modules/react-dom.js";
import {RecoilRoot} from "../web_modules/recoil.js";
async function _themeLoad() {
  await import("../web_modules/antd/dist/antd.css.proxy.js");
  await import("../web_modules/antd/dist/antd.dark.css.proxy.js");
}
const themes = {
  light: "%PUBLIC_URL%web_modules/antd/dist/antd.css",
  dark: "%PUBLIC_URL%web_modules/antd/dist/antd.dark.css"
};
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(RecoilRoot, null, /* @__PURE__ */ React.createElement(App2, null))), document.getElementById("root"));
if (import.meta.hot) {
  import.meta.hot.accept();
}
