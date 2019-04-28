var path = require('path');

var DemoPlugin = require('./src/plugins/demo');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new DemoPlugin()
  ]
}
