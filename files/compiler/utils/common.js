import path from 'path';
import { fileURLToPath } from 'url';

import packageJSON from '../../package.json';

const { config: { directories: dirs } } = packageJSON;

export const isset = (variable) => typeof variable !== 'undefined';

export const dirname = (url) =>
  path.dirname(fileURLToPath(url));

export const alias = (folder) =>
  path.resolve(dirname(import.meta.url), `../../${ dirs.source }/${ folder }`);

export const getAlises = (folders) =>
  folders.reduce((acc, folder) => ({ ...acc, [folder]: alias(folder) }), {});

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const statsOptions = {
  assets: false,
  builtAt: false,
  colors: true,
  children: false,
  chunks: false,
  entrypoints: false,
  hash: false,
  modules: false,
  version: false
};
