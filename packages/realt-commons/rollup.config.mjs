import postcss from 'rollup-plugin-postcss';
import json from "rollup-plugin-json";
import svgr from '@svgr/rollup';

const plugins = [
  svgr(),
  json(),
  postcss({
    config: true,
    modules: true,
    inject: true,
    autoModules: true,
  })
];

export default {
  plugins: plugins,
}