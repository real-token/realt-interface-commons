import css from 'rollup-plugin-import-css';
import postcss from 'rollup-plugin-postcss';
import json from "rollup-plugin-json";
import svgr from '@svgr/rollup';

const plugins = [
  svgr(),
  json(),
  postcss({
    config: true,
    modules: false,
    extract: true,
    autoModules: true,
    use: ['sass'],
  }),
  css()
];

export default {
  plugins: plugins,
}