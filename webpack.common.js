const fs = require('fs');
const R = require('ramda');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ROUTINE_PATH = './src/assets/routines';
const ROUTINES = R.pipe(
  R.filter(name => name.substr(-4, 4) === 'json'),
  R.map(file => require(`${ROUTINE_PATH}/${file}`)),
)(fs.readdirSync(ROUTINE_PATH));
const EXERCISES = require('./src/assets/exercises.json');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      __ROUTINES__: JSON.stringify(ROUTINES),
      __EXERCISES__: JSON.stringify(EXERCISES),
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
