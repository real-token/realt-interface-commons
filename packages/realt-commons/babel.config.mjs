import currentPkg from "./package.json" assert { type: "json" };
const runtimeVersion = currentPkg.peerDependencies["@babel/runtime"];

const babel = {
  presets: [
    "@babel/env", 
    ["@babel/preset-react",{ "runtime": "automatic" }], 
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-syntax-bigint",
    "@babel/plugin-transform-object-rest-spread",
    ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
    "@babel/plugin-transform-class-properties",
    ["@babel/transform-runtime", { version: runtimeVersion }],
    "@babel/plugin-transform-numeric-separator",
    ["styled-components",{"ssr": true}]
  ],
  sourceType: "unambiguous",
};

export default babel;