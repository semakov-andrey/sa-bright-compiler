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

ncp(files, target, () => {
  renameSync(gi, targetgi);
  if (!existsSync(targetpj)) return;
  const targetjson = deepmerge.all([
    JSON.parse(readFileSync(targetpj)),
    { scripts: {
      'install-compiler': `npx sa-bright-compiler@${version}`,
      'update-compiler': 'npx sa-bright-compiler'
    } },
    JSON.parse(readFileSync(pj))
  ]);
  writeFileSync(targetpj, JSON.stringify(targetjson, null, 2));
  unlinkSync(pj);
});