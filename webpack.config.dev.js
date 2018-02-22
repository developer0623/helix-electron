require('dotenv').config({ silent: true });

import webpack from 'webpack';
import path from 'path';

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: {
    'web': path.resolve(__dirname, 'src/web/index'),
    'admin': path.resolve(__dirname, 'src/admin/index')
  },
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "http://localhost:3000/", // Development Server
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    //new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        GA_TRACKING_ID: JSON.stringify('UA-98616321-2')
      }
    }),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
  node: {
    __dirname: true
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader']},
      { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml' },
      { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject' },
      { test: /\.(png|jpg|ico)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};
