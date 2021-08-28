import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import packageJSON from '../../package.json';
import { getAlises } from '../utils/common.js';
import { ServiceWorkerPlugin } from '../utils/service-worker-plugin.js';

const { config: { directories: dirs } } = packageJSON;

if (dirs.assets !== '') {
  dirs.assets += '/';
}

export const webpackConfigCommon = () => ({
  target: 'web',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        loader: 'esbuild-loader',
        exclude: /node_modules/u,
        options: {
          loader: 'tsx',
          target: 'es2020'
        }
      },
      {
        test: /\.svg$/u,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2020'
            }
          },
          './compiler/utils/named-export-svg-loader.cjs',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { convertColors: { shorthex: true } },
                  { removeEmptyAttrs: false },
                  { cleanupIDs: false }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${ dirs.source }/sw.js`, to: 'sw.js' }
      ]
    }),
    new ServiceWorkerPlugin()
  ],
  resolve: {
    extensions: [
      '.json',
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    alias: {
      ...getAlises([
        'entities',
        'domain',
        'interface',
        'store',
        'utils'
      ])
    }
  }
});
