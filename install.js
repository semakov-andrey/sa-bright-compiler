#!/usr/bin/env node

import { basename, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, renameSync, readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs';
import ncp from 'ncp';
import deepmerge from 'deepmerge';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectFolder = basename(resolve(__dirname, '../')) !== 'node_modules' ? `./tmp/` : './';
const packagePath = (folder) => resolve(__dirname, folder);
const projectPath = (folder) => resolve(projectFolder, folder);

const { version } = JSON.parse(readFileSync(packagePath('./package.json')));

const files = packagePath('files');
const target = projectPath('./');
const gi = projectPath('.gitignore.data');
const targetgi = projectPath('.gitignore');
const pj = projectPath('package.data.json');
const targetpj = projectPath('package.json');

const arrayMerge = (destinationArray, sourceArray) => sourceArray;

const abcSorting = (o) =>
  Object.fromEntries(Object.entries(o).sort(([ keyA ], [ keyB ]) => keyA.localeCompare(keyB)));

const packageJSONMerge = () => {
  if (!existsSync(targetpj)) return;

  const json = deepmerge.all([
    JSON.parse(readFileSync(targetpj)),
    { scripts: {
      'install-compiler': `npx sa-bright-compiler@${version}`,
      'update-compiler': 'npx sa-bright-compiler'
    } },
    JSON.parse(readFileSync(pj))
  ], { arrayMerge });
  
  writeFileSync(targetpj, JSON.stringify({
    ...json,
    dependencies: abcSorting(json.dependencies),
    devDependencies: abcSorting(json.devDependencies)
  }, null, 2));
  unlinkSync(pj);
};

ncp(files, target, () => {
  renameSync(gi, targetgi);
  packageJSONMerge();
});