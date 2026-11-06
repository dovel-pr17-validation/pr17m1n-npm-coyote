const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const glob = require('glob-all');
const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new webpack.EnvironmentPlugin({
    'FRONTEND_SENTRY_DSN': null,
    'VAPID_PUBLIC_KEY': null,
    'RELEASE': null,
  }),
];

module.exports = merge(common, {
  mode: "production",
  optimization: {
    chunkIds: 'named',
    minimize: true,
    usedExports: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins,
});
