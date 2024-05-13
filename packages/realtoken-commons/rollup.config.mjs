import postcss from 'rollup-plugin-postcss';
import json from "rollup-plugin-json";
import svgr from '@svgr/rollup';
import banner from 'rollup-plugin-banner2';
import resolve from "@rollup/plugin-node-resolve";
import commonJs from '@rollup/plugin-commonjs';
import pol from "rollup-plugin-polyfill-node";
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts'

import packageJson from './package.json' assert { type: "json" };

const extensions = ['.ts', '.tsx', '.js', '.jsx']
const bannedUseClientFiles = ['index']

const plugins = [
  pol(),
  commonJs(),
  // Allows node_modules resolution
  resolve({
    extensions,
    preferBuiltins: false,
    browser: true,
  }),
  esbuild({
    sourceMap: false,
    tsconfig: './tsconfig.json',
  }),
  svgr(),
  json(),
  postcss({
    config: true,
    modules: true,
    inject: true,
    autoModules: true,
  }),
  banner((chunck) => {
    if(!bannedUseClientFiles.includes(chunck.fileName)){
      return "'use client';\n";
    }
    return undefined
  }),
];

const external = [
  ...Object.keys({
    ...packageJson.devDependencies,
    ...packageJson.dependencies,
  }),
  /@babel\/runtime/,
  /^@ethersproject\/.*/,
  'react/jsx-runtime'
]

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: 'es',
        entryFileNames: '[name].js',
        dir: 'dist/esm',
        sourcemap: true,
        exports: 'named'
      },
      {
        format: 'cjs',
        entryFileNames: '[name].cjs',
        dir: 'dist/cjs',
        sourcemap: true,
        interop: 'auto',
        exports: 'named'
      }
    ],
    external,
    plugins
  },
  {
    input: "src/index.ts",
    output: [{
      format: 'es',
      file: 'dist/index.d.ts'
    }],
    plugins: [
      json(),
      svgr(),
      dts()
    ]
  }
]