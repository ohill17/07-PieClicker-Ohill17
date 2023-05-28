const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// this loads all of the variables in the .env file
// they're available in your code as process.env.KEY
require('dotenv').config();

/**
 * flag Used to check if the environment is production or not
*/
const isProduction = (process.env.NODE_ENV === 'production');

/**
* Include hash to filenames for cache busting - only at production
*/
const fileNamePrefix = isProduction ? '[chunkhash].' : '';

module.exports = {
  mode: !isProduction ? 'development' : 'production',
  entry: {
    main: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: fileNamePrefix + '[name].js',
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  target: 'web',
  devServer: {
    static: "./dist"
  },
  /* no separate source map files in production */
  devtool: !isProduction ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ""
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ""
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      inject: "body",
      filename: "index.html",
    }),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images"),
          to: path.resolve(__dirname, "dist/assets/images"),
        },
      ],
    }),
    /* app uses global SERVER_URL rather than process.env.SERVER_URL */
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      SERVER_URL: JSON.stringify(process.env.SERVER_URL),
      GMAP_KEY: JSON.stringify(process.env.GMAP_KEY),
    }),
    new MiniCssExtractPlugin({
      filename: fileNamePrefix + "[name].css",
    })
  ],
  /* separates js (and css) that is shared between bundles - allows browser to cache */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
