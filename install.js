#!/usr/bin/env node

import { renameSync } from 'fs';
import ncp from 'ncp';

import { installIgnores } from './install.ignores.js';
import { installPackageJSON } from './install.package.js';
import { packagePath, projectPath } from './utils.js';

const files = packagePath('files');
const target = projectPath('./');

ncp(files, target, () => {
  installIgnores();
  installPackageJSON();
});