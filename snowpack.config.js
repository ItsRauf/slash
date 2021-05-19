/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
  ],
  optimize: {
    minify: true,
    target: 'es2020',
    treeshake: true,
  },
  buildOptions: {
    /* ... */
    baseUrl: '/slash',
  },
  packageOptions: {
    knownEntrypoints: [
      'react',
      'react-dom',
      'recoil',
      'antd/dist/antd.css',
      'antd/dist/antd.dark.css',
      'antd/es/card',
      'antd/es/layout',
      'antd/es/space',
      'antd/es/button',
      'antd/es/skeleton',
      'antd/es/row',
      'antd/es/col',
      'antd/es/modal',
      'antd/es/form',
      'antd/es/input',
      'antd/es/typography',
      'antd/es/switch',
      '@ant-design/icons/lib/components/Icon',
    ],
  },
};
