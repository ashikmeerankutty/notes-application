const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /node_modules\/vfile\/core\.js/,
        use: [{
          loader: 'imports-loader',
          options: {
            type: 'commonjs',
            imports: ['single process/browser process'],
          },
        }],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      components: path.resolve(
        __dirname,
        './src/app/shared/components'
      ),
      path: "path-browserify",
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './src/assets/images/favicon.png'
    }),
    new Dotenv({
      safe: true,
    }),
  ],
  devServer: {
    port: 9000,
    historyApiFallback: true,
  }
};