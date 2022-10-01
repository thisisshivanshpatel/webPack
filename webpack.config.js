const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "/src/index.js"), //for code splitting
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js", //for a dynamic file name
    clean: true, //for stopping creation of multiple files on every changes,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map", //for error debugging indicate the line on which error occurred
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000, //sets the port
    open: true, //opens the browser
    hot: true, //hot reloading
    compress: true, //for compressing
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], //for backward compatibility,older browsers
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, //for supporting images
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "WebPack App",
      filename: "index.html",
      template: "src/template.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
};
