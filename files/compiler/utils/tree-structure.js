import { readdir, stat, writeFile } from 'fs/promises';
import { resolve, extname } from 'path';

import chokidar from 'chokidar';

export class TreeStructure {
  watcher = null;

  constructor(root = 'src', isProduction = true) {
    this.root = root;
    this.isProduction = isProduction;
  };

  start = async () => {
    await this.generate();
    if (!this.isProduction) this.events();
    console.info('Tree structure was generated\n');
  };

  generate = async () => {
    const treeStructure = await this.getTreeStructure(this.root);
    const spaces = 2;
    await writeFile(`${ this.root }/tree-structure.json`, JSON.stringify(treeStructure, null, spaces));
  };

  events = () => {
    this.watcher = chokidar
      .watch(resolve(this.root, '**/*.md'), {
        awaitWriteFinish: {
          stabilityThreshold: 500,
          pollInterval: 100
        }
      })
      .on('change', () => {
        this.generate();
      });
    process
      .on('SIGINT', () => {
        process.exit();
      });
  };

  finish = async () => {
    if (this.watcher) {
      await this.watcher.close();
    }
  };

  getTreeStructure = async (parentPath) => {
    let files = [];
    try {
      const children = await readdir(parentPath);
      for await (const childName of children) {
        const childPath = resolve(parentPath, childName);
        if (await (await stat(childPath)).isDirectory()) {
          files = [
            ...files,
            { name: childName, type: 'directory', children: await this.getTreeStructure(childPath) }
          ];
        }
        if (extname(childName) === '.md') {
          files = [
            ...files,
            { name: childName, type: 'file' }
          ];
        }
      }
    } catch (err) {
      console.error(err);
    }

    return files;
  };
}
