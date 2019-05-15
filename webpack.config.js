let path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let TransferJson = require('./src/plugins/transferJson');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
  mode: 'development',
  entry: path.resolve(SRC_PATH, 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader' }
      ]
    }],
  },
  plugins: [
    new TransferJson({
      jsonFile: path.resolve(SRC_PATH, 'config/var.json'),
      jsPath: path.resolve(SRC_PATH, 'config'),
      lessPath: path.resolve(SRC_PATH, 'config')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, './index.html'),
      filename: 'index.html',
      chunks: ['main']
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}
