import { extname } from 'path';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import packageJSON from '../../package.json';
import { webpackConfig } from '../config/webpack.dev.js';
import { CssTypes } from '../utils/css-types.js';
import { logger } from '../utils/logger.js';
import { TreeStructure } from '../utils/tree-structure.js';

const { config: { directories: dirs, devPort: port } } = packageJSON;

const cssTypes = new CssTypes(false, dirs.source, 'css');
await cssTypes.start();

const treeStructure = new TreeStructure(`${ dirs.source }/articles`, false);
await treeStructure.start();

logger('dev server', port)();

const server = express();

server.use((req, res, next) => {
  if (!/(\.(?!html)\w+$|__webpack.*|index\.css)/u.test(req.url)) {
    req.url = '/';
  }
  if (req.url.includes('articles') && extname(req.url) === '.md' && req.get('X-Fetch') !== 'true') {
    req.url = '/';
  }
  next();
});

const compilerClient = webpack(webpackConfig());
server.use(webpackDevMiddleware(compilerClient, { stats: 'minimal' }));
server.use(webpackHotMiddleware(compilerClient, { log: false }));

server.listen(port);
