const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
/*       {
        test: /\.jsx?$/,
        exclude: ['node_modules'],
        use: ['babel-loader'],
      }, */
    ],
  },
  resolve: {
    alias: {
      config$: './configs/app-config.js',
      react: './vendor/react-master',
    },
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      'bower_components',
      'shared',
      '/shared/vendor/modules',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};