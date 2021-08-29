import { readFileSync, existsSync, writeFileSync, unlinkSync, renameSync } from 'fs';
import deepmerge from 'deepmerge';

import { projectPath, arrayMerge } from './utils.js';

const j = projectPath('data.tsconfig.json');
const targetj = projectPath('tsconfig.json');

export const installTSConfig = () => {
  if (!existsSync(targetj)) {
    renameSync(j, targetj);
    return;
  }

  const tJSON = JSON.parse(readFileSync(j));
  const targetJSON = JSON.parse(readFileSync(targetj));

  // targetJSON listed 2 times for saving sort of project properties
  const json = deepmerge.all([
    targetJSON,
    tJSON,
    targetJSON
  ], { arrayMerge });

  writeFileSync(targetj, JSON.stringify(json, null, 2) + '\r\n');
  unlinkSync(j);
}