#!/usr/bin/env node

import { basename, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, renameSync, readFileSync, existsSync, writeFileSync } from 'fs';
import ncp from 'ncp';
import deepmerge from 'deepmerge';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectFolder = basename(resolve(__dirname, '../')) !== 'node_modules' ? `./tmp/` : './';
const packagePath = (folder) => resolve(__dirname, folder);
const projectPath = (folder) => resolve(projectFolder, folder);

const files = packagePath('files');
const target = projectPath('./');
const gi = projectPath('.gitignore.data');
const targetgi = projectPath('.gitignore');
const pj = projectPath('package.data.json');
const targetpj = projectPath('package.json');

ncp(files, target, () => {
  renameSync(gi, targetgi);
  if (!existsSync(targetpj)) return;
  const targetjson = deepmerge(
    JSON.parse(readFileSync(pj)), 
    JSON.parse(readFileSync(targetpj))
  );
  writeFileSync(targetpj, JSON.stringify(targetjson));
});