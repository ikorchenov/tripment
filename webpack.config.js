const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const distPath = resolve(__dirname, 'dist');
const staticPath = resolve(__dirname, 'static');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.tsx',
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: 'main.js',
    path: distPath,
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]',
                localIdentContext: resolve(__dirname, 'src'),
              },
              sourceMap: true,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/svg+xml',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.ts', '.tsx', '.json', '.scss'],
  },
  optimization: {
    minimize: !isDevelopment,
  },
  devServer: {
    contentBase: [distPath, staticPath],
    compress: true,
    port: 3000,
    hot: true,
  },
  stats: 'minimal',
};
