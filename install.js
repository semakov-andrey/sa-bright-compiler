#!/usr/bin/env node

import { basename, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import ncp from 'ncp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectFolder = basename(resolve(__dirname, '../')) !== 'node_modules' ? `./tmp/` : './';
const packagePath = (folder) => resolve(__dirname, folder);
const projectPath = (folder) => resolve(projectFolder, folder);

const files = packagePath('files');
const target = projectPath('./');
const gi = packagePath('files/.gitignore');
const targetgi = projectPath('.gitignore');

if (!existsSync(target)) mkdirSync(target);
ncp(files, target);
copyFileSync(gi, targetgi);