import path from 'path';

import autoprefixer from 'autoprefixer';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
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
  .map(([ key, value ]) =>
    [ key, [ path.resolve(dirs.source, value) ] ]));

const [ firstEntry ] = Object.values(entries);

export const webpackConfig = () =>
  merge(webpackConfigCommon(), {
    entry,
    mode: 'production',
    target: 'node',
    output: {
      filename: `${ dirs.assets }[name].[contenthash:8].js`,
      path: path.resolve(dirs.production)
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
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: `${ dirs.source }/${ firstEntry }.html`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          quoteCharacter: '"',
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeOptionalTags: false
        }
      }),
      new MiniCssExtractPlugin({
        filename: `${ dirs.assets }[name].[contenthash:8].css`
      }),
      new Favicon(`${ dirs.source }/interface/assets/favicon`, true),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'VERSION': JSON.stringify(version)
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        defaultSizes: 'parsed',
        statsFilename: 'stats.json'
      })
    ],
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2020',
          legalComments: 'none',
          css: true
        })
      ]
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 4096000
    }
  });
