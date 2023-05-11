const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/app.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(__dirname, "public") }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    historyApiFallback: true,
    compress: true,
    port: 8000,
  },
};
