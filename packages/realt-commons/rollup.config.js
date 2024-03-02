import css from 'rollup-plugin-import-css';
import postcss from 'rollup-plugin-postcss';
import json from "rollup-plugin-json";
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import typescript from 'rollup-plugin-typescript2';
import commonJs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const external = [
  '@coinbase/wallet-sdk',
  '@emotion/react',
  '@gnosis.pm/safe-apps-sdk',
  '@mantine/core',
  '@mantine/form',
  '@mantine/hooks',
  '@mantine/modals',
  '@mantine/notifications',
  '@real-token/web3-react-aa',
  '@safe-global/safe-apps-provider',
  '@tabler/icons',
  '@tabler/icons-react',
  '@types/lodash',
  '@web3-react/abstract-connector',
  '@web3-react/core',
  '@web3-react/metamask',
  '@web3-react/network',
  '@web3-react/types',
  '@web3-react/walletconnect-v2',
  'babel-merge',
  'cookies-next',
  'country-flag-icons',
  'dotenv',
  'eth-provider',
  'ethers',
  'i18next-resources-for-ts',
  'import',
  'jotai',
  'lodash',
  'pathe',
  'react',
  'react-dom',
  'rollup-plugin-import-css',
  'rollup-plugin-polyfill-node',
  'simple-zustand-devtools',
  'styled-components',
  'tabler-icons-react',
  'tslib',
  'zustand',
  'i18next',
  'react-i18next',
  /^@coinbase\/wallet-sdk\//,
  /^@emotion\/react\//,
  /^@gnosis.pm\/safe-apps-sdk\//,
  /^@mantine\/core\//,
  /^@mantine\/form\//,
  /^@mantine\/hooks\//,
  /^@mantine\/modals\//,
  /^@mantine\/notifications\//,
  /^@real-token\/web3-react-aa\//,
  /^@safe-global\/safe-apps-provider\//,
  /^@tabler\/icons\//,
  /^@types\/lodash\//,
  /^@web3-react\/abstract-connector\//,
  /^@web3-react\/core\//,
  /^@web3-react\/metamask\//,
  /^@web3-react\/network\//,
  /^@web3-react\/types\//,
  /^@web3-react\/walletconnect-v2\//,
  /^babel-merge\//,
  /^cookies-next\//,
  /^country-flag-icons\//,
  /^dotenv\//,
  /^eth-provider\//,
  /^ethers\//,
  /^i18next-resources-for-ts\//,
  /^import\//,
  /^jotai\//,
  /^lodash\//,
  /^pathe\//,
  /^react\//,
  /^react-dom\//,
  /^rollup-plugin-import-css\//,
  /^rollup-plugin-polyfill-node\//,
  /^simple-zustand-devtools\//,
  /^styled-components\//,
  /^tabler-icons-react\//,
  /^tslib\//,
  /^zustand\//,
  /^i18next\//,
  /^react-i18next\//,
  /@babel\/runtime/
];

const plugins = [
  typescript(),
  resolve({
    extensions: ['.ts', '.tsx', '.js', '.json'],
    preferBuiltins: true,
    browser: true,
  }),
  commonJs(),
  svgr(),
  json(),
  postcss({
      modules: true,
  }),
  css(),
  nodePolyfills(),
];

const input = './src/index.ts';

const config = [
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'realtCommons',
      sourcemap: true,
      inlineDynamicImports: true,
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

// module.exports = {
//     input: './src/index.ts',
    
//     output: [
//       {
//         file: 'dist/index.esm.js',
//         format: 'es',
//         sourcemap: true,
//         inlineDynamicImports: true,
//       },
//       {
//         file: 'dist/index.cjs.js',
//         format: 'cjs',
//         sourcemap: true,
//         inlineDynamicImports: true,
//       },
//       {
//         file: 'dist/index.umd.js',
//         format: 'umd',
//         name: 'realtCommons',
//         sourcemap: true,
//         inlineDynamicImports: true,
//       },
//     ],
//     plugins: [
      
//     ]
// }