const currentPkg = require("./package.json");
const runtimeVersion = currentPkg.peerDependencies["@babel/runtime"];

export default {
  presets: [
    "@babel/env", 
    ["@babel/preset-react",{"runtime": "automatic"}], 
    "@babel/preset-typescript"
],
  plugins: [
    "@babel/plugin-syntax-bigint",
    "@babel/plugin-transform-object-rest-spread",
    ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
    "@babel/plugin-transform-class-properties",
    ["@babel/transform-runtime", { version: runtimeVersion }],
    "@babel/plugin-transform-numeric-separator",
  ],
  sourceType: "unambiguous",
};