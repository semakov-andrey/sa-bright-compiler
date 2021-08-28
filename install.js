#!/usr/bin/env node

import { renameSync } from 'fs';
import copydir from 'copy-dir';

import { installIgnores } from './install.ignores.js';
import { installPackageJSON } from './install.package.js';
import { installTSConfig } from './install.tsconfig.js';
import { packagePath, projectPath } from './utils.js';

const files = packagePath('files');
const target = projectPath('./');

copydir.sync(files, target);

installIgnores();
installPackageJSON();
installTSConfig();