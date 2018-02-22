require('dotenv').config({ silent: true });

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export const webConfig = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: path.resolve(__dirname, 'src/web/index'),
  target: 'web',
  output: {
    path: __dirname + '/dist/web', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'web.js'
  },
  devServer: {
    contentBase: './dist/web'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        GA_TRACKING_ID: JSON.stringify('UA-98616321-1')
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
      { test: /\.js$/, include: [path.join(__dirname, 'src/web'), path.join(__dirname, 'src/api')], loaders: ['babel']},
      { test: /(\.css|\.scss|\.sass)$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')},
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

export const adminConfig = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: path.resolve(__dirname, 'src/admin/index'),
  target: 'web',
  output: {
    path: __dirname + '/dist/admin', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'admin.js'
  },
  devServer: {
    contentBase: './dist/admin'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('admin.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        GA_TRACKING_ID: JSON.stringify(process.env.DASHBOARD_GA_TRACKING_ID)
      }
    }),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: [path.join(__dirname, 'src/admin'), path.join(__dirname, 'src/api')], loaders: ['babel']},
      { test: /(\.css|\.scss|\.sass)$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')},
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
