const packageJson = require('./package.json');
const version = packageJson.version;
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

  const conf = {
    mode: 'development',
    devServer: {
      open: true,
      openPage: ['index.html','index_with_bootstrap.html'],
      contentBase: path.join(__dirname, 'example'),
      watchContentBase: true,
      port: 3000,
      host: argv.mode === 'production' ? `localhost` : `localhost`,
      disableHostCheck: true,
    },
    entry: {
      'sortable-table': ['./src/index.js'],
    },
    output: {
      path: path.join(__dirname, 'lib'),
      publicPath: '/',
      filename: argv.mode === 'production' ? `[name].js` : `[name].js`,
      library: 'SortableTable',
      libraryExport: 'default',
      libraryTarget: 'umd',
      globalObject: 'this',
      umdNamedDefine: true,
      auxiliaryComment: {
        root: 'for Root',
        commonjs: 'for CommonJS environment',
        commonjs2: 'for CommonJS2 environment',
        amd: 'for AMD environment',
      }
    },

    optimization: {
      minimizer: [new TerserPlugin({
        //extractComments: true,
        //cache: true,
        //parallel: true,
        //sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,

      })],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ]
        },
      ],

    },
    resolve: {
      alias: {}
    },
    plugins: [
      new webpack.BannerPlugin(`[name](https://github.com/riversun/[name]) v${version} Copyright (c) 2020 riversun.org@gmail.com`),
    ],

  };

  if (argv.mode !== 'production') {
    conf.devtool = 'inline-source-map';
  }

  return conf;

};
