const base = require("./webpack.base.js");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "development",
  entry: {
    main: ["./src/client/client.js"]
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "[name]-client-bundle.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};

module.exports = merge(
  base(true, {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          sourceMap: true
        }
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }
    ]
  }),
  config
);
