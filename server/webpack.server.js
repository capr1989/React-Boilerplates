const base = require("./webpack.base.js");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const config = {
  mode: "development",
  target: "node",

  entry: {
    main: ["./index.js"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "[name]-bundle.js"
  }
};
module.exports = merge(base(false, {}), config);
