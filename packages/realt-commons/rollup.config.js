import css from 'rollup-plugin-import-css';
import postcss from 'rollup-plugin-postcss';
import json from "rollup-plugin-json";
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import commonJs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import babel from '@rollup/plugin-babel';

import babelConfig from './babel.config';
import pkg from './package.json';

const babelConf = {
  extensions: [ '.js', '.ts', '.json', '.mjs', '.jsx', '.tsx' ],
  exclude: 'node_modules/**',
  babelHelpers: "runtime",
  babelrc: false,
  ...babelConfig,
  configFile: false,
};

console.log(babelConf);

const allDeps = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
const external = [...allDeps, ...allDeps.map((x) => new RegExp(`^${x}/`)), /@babel\/runtime/]

const plugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.js', '.json'],
    preferBuiltins: true,
    browser: true,
  }),
  commonJs(),
  babel(babelConf),
  svgr(),
  json(),
  postcss({
    config: true,
    modules: false,
    extract: true,
    autoModules: true,
    use: ['sass'],
  }),
  css(),
  nodePolyfills(),
];

const input = './src/index.ts';

const config = [
  {
    input,
    output: {
      // file: 'dist/index.esm.js',
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
      interop: "compat",
      // inlineDynamicImports: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      // file: 'dist/index.cjs.js',
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      // inlineDynamicImports: true,
      interop: "auto",
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'realtCommons',
      sourcemap: true,
      inlineDynamicImports: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
        'styled-components': 'styled',
        '@mantine/core': 'mantineCore', 
        '@mantine/form': 'mantineForm', 
        '@mantine/hooks': 'mantineHooks', 
        '@mantine/modals': 'mantineModals', 
        '@mantine/notifications': 'mantineNotifications',
        "@web3-react/coinbase-wallet": "web3ReactCoinbaseWallet",
        "@web3-react/core": "web3ReactCore",
        "@web3-react/gnosis-safe": "web3ReactGnosisSafe",
        "@web3-react/metamask": "web3ReactMetamask",
        "@web3-react/network": "web3ReactNetwork",
        "@web3-react/types": "web3ReactTypes",
        "@web3-react/walletconnect": "web3ReactWalletConnect",
        "@web3-react/walletconnect-v2": "web3ReactWalletConnectV2",
        "i18next": "i18next",
        "react-i18next": "reactI18next",
        "@real-token/web3-react-aa": "web3ReactAA",
        "@tabler/icons-react": "tablerIconsReact",
        "zustand": "zustand",
        "country-flag-icons": "countryFlagIcons",
        "cookies-next": "cookiesNext",
        "jotai": "jotai",
        "@gnosis.pm/safe-apps-sdk": "safeAppsSdk",
        "ethers": "ethers",
        "lodash": "lodash",
      }
    },
    plugins,
    external,
  },
  {
    input: './src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [
      svgr(),
      dts()
    ],
  },
];

module.exports = config;