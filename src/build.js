const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const esmcjs = () =>
  webpack({
    entry: "./src/index.js",
    mode: "none",
    output: {
      iife: false,
      clean: true,
    },
  });

const cssLoader = () =>
  webpack({
    mode: "none",
    entry: "./src/index.js",
    output: {
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin()],
  });

const jsonLoader = () =>
  webpack({
    mode: "none",
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash:6].js",
      clean: true,
    },
    module: {
      rules: [
        {
          use: "./json-loader.js",
          test: /\.json3$/,
        },
      ],
    },
  });

const removeLogLoader = () =>
  webpack({
    mode: "none",
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash:6].js",
      clean: true,
    },
    module: {
      rules: [
        {
          use: "./removeLogLoader.js",
          test: /\.js$/,
        },
      ],
    },
  });
function codesplit() {
  return webpack({
    entry: "./src/index.js",
    mode: "none",
    output: {
      filename: "main.[id].[contenthash].js",
      chunkFilename: "[name].[id].chunk.[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  });
}
codesplit().run((err, stats) => {
  console.log(err ?? "---done---");
});
