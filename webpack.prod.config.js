const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // use is long form of "loader:" to use multiple loaders with custom config
        use: [
          // webpack read "bottom to top" of following loaders, so we need to use 'css-loader' first to understand .css files
          // and then use 'style-loader' to understand style in those .css files
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              // [name] of class we defined, [local] module name(so called component name), [hash] for unique names
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]' // 8000 bytes, "name=" is filepath to where the images will be copied. eg: dist/images (use output path dist)
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
