import 'antd/dist/antd.dark.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
// import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

async function _themeLoad() {
  await import('antd/dist/antd.css');
  await import('antd/dist/antd.dark.css');
}

const themes = {
  light: '%PUBLIC_URL%web_modules/antd/dist/antd.css',
  dark: '%PUBLIC_URL%web_modules/antd/dist/antd.dark.css',
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
