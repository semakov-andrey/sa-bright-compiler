import path from 'path';

import autoprefixer from 'autoprefixer';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { webpackConfigCommon } from './webpack.common.js';

import packageJSON from '../../package.json';
import { Favicon } from '../utils/favicon.js';

const {
  config: { directories: dirs, entries },
  version
} = packageJSON;

const entry = Object.fromEntries(Object
  .entries(entries)
  .map(([ key, value ], index) =>
    [
      key,
      [
        ...index === 0 ? [ 'webpack-hot-middleware/client' ] : [],
        path.resolve(dirs.source, value)
      ]
    ]));

const [ firstEntry ] = Object.values(entries);

export const webpackConfig = () =>
  merge(webpackConfigCommon(), {
    entry,
    mode: 'development',
    target: 'web',
    output: {
      filename: `${ dirs.assets }[name].js`,
      path: path.resolve(dirs.development)
    },
    module: {
      rules: [
        {
          test: /\.css$/u,
          use: [
            './compiler/utils/named-export-css-loader.cjs',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:5]',
                  exportLocalsConvention: 'camelCase'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [ postcssNested, postcssCustomMedia, autoprefixer() ]
                }
              }
            }
          ]
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new CircularDependencyPlugin({
        exclude: /node_modules/u,
        include: /src/u,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd()
      }),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: `${ dirs.source }/${ firstEntry }.html`
      }),
      new MiniCssExtractPlugin({
        filename: `${ dirs.assets }[name].css`
      }),
      new webpack.HotModuleReplacementPlugin(),
      new Favicon(`${ dirs.source }/interface/assets/favicon`, false),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'VERSION': JSON.stringify(version)
      }),
      new webpack.ProgressPlugin({ percentBy: 'entries' })
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    }
  });
