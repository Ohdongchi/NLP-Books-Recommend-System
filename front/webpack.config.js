const path = require("path");
const webpack = require("webpack");

module.exports = {
  name: "blog",
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    // host:'dongchi.kro.kr',
    port: '3002',
    contentBase: __dirname + "/public"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx",".css"],
  },
  entry: {
    app: ["@babel/polyfill", path.resolve(__dirname, "index.tsx")],
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-hot-loader/babel"],
        },
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: ['ts-loader']
      }
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    filename: "frontApp.js",
    path: path.join(__dirname, "/dist"),
  }, // 출력
};