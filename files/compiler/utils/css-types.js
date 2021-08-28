import fs from 'fs';
import path from 'path';
import util from 'util';

import camelCase from 'camelcase';
import chokidar from 'chokidar';
import postcss from 'postcss';
import modules from 'postcss-modules';
import nested from 'postcss-nested';

import { capitalize, dirname } from './common.js';

const unlink = util.promisify(fs.unlink);

export class CssTypes {
  isProduction = true;

  typesPaths = [];

  watcher = null;

  constructor(
    isProduction = true,
    folder = 'src',
    ext = 'css',
    root = path.resolve(dirname(import.meta.url), '../../')
  ) {
    this.isProduction = isProduction;
    this.folder = folder;
    this.ext = ext;
    this.root = root;
  };

  start = async () => {
    const filesList = this.findStyles(this.folder, new RegExp(`\\.${ this.ext }$`, 'u'));
    const promises = [];
    filesList.forEach((file) => {
      promises.push(this.generate(path.resolve(this.root, file)));
    });
    await Promise.all(promises);
    if (!this.isProduction) this.events();
    console.info('CSS types was generated temporary\n');
  };

  findStyles = (startPath, regExp, filesList = []) => {
    if (!fs.existsSync(startPath)) {
      console.error(`Directory ${ startPath } doesn't exist`);

      return [];
    }
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
      const filename = path.join(startPath, files[i] ?? '');
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        this.findStyles(filename, regExp, filesList);
      }
      else if ((files[i] ?? '').search(regExp) !== -1) {
        filesList.push(filename);
      }
    }

    return filesList;
  };

  generate = async (filePath) => {
    const fullPath = path.resolve(this.root, filePath);
    const relativePath = fullPath.replace(this.root, '').substr(1);
    try {
      const data = fs.readFileSync(fullPath, 'utf-8');
      const result = await postcss([
        nested(),
        modules({ localsConvention: 'camelCaseOnly', getJSON: () => null })
      ]).process(data, { from: fullPath });
      const types = Object.keys(result.messages[0].exportTokens);
      const name = capitalize(camelCase(path.basename(filePath, '.css')));
      const interfaces = types.sort().map((key) => `  ${ key }: string;`).join('\n');
      const typeContent =
        `interface CSS {\n${ interfaces }\n}\n\nexport const css: CSS;\n\nexport const css${ name }: CSS;\r\n`;
      const typeFullPath = `${ fullPath }.d.ts`;
      fs.writeFileSync(typeFullPath, types.length > 0 ? typeContent : '');
      // console.info(`CSS types was generated for ${ relativePath }`);
      if (!this.typesPaths.includes(typeFullPath)) {
        this.typesPaths.push(typeFullPath);
      }
    } catch (e) {
      console.error(e);

      return console.error('\x1b[31m%s\x1b[0m', `CSS syntax error: ${ relativePath }`);
    }
  };

  remove = async () => {
    const promises = [];
    this.typesPaths.forEach((path) => {
      promises.push(unlink(path));
    });

    return await Promise.all(promises);
  };

  events = () => {
    this.watcher = chokidar
      .watch(path.resolve(this.root, this.folder, '**/*.css'), {
        awaitWriteFinish: {
          stabilityThreshold: 500,
          pollInterval: 100
        }
      })
      .on('change', (filePath) => {
        this.generate(path.relative(this.root, filePath));
      });
    process
      .on('SIGINT', async () => {
        await this.remove();
        process.exit();
      });
  };

  finish = async () => {
    await this.remove();
    if (this.watcher) {
      await this.watcher.close();
    }
  };
};
