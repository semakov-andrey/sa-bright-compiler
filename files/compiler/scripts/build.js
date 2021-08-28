import fs from 'fs';

import del from 'del';
import webpack from 'webpack';

import packageJSON from '../../package.json';
import { webpackConfig } from '../config/webpack.prod.js';
import { isset, statsOptions } from '../utils/common.js';
import { CssTypes } from '../utils/css-types.js';
import { TreeStructure } from '../utils/tree-structure.js';

const { config: { directories: dirs, isReact } } = packageJSON;

if (fs.existsSync(dirs.production)) {
  del.sync(`${ dirs.production }/**/*`);
}

const cssTypes = new CssTypes(true, dirs.source, 'css');
await cssTypes.start();

const treeStructure = new TreeStructure(`${ dirs.source }/articles`, true);
await treeStructure.start();

console.info('Building...');
const compilerClient = webpack(webpackConfig());

compilerClient.run(async (error, stats) => {
  if (error instanceof Error) {
    console.error(error.stack ?? error);
    if (isset(error.details)) {
      console.error(error.details);
    }
  } else {
    await cssTypes.finish();
    console.info(stats.toString(statsOptions));
    console.info('Frontend compiled successfully.');
  }
});
