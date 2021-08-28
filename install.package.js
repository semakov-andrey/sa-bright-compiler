import { readFileSync, existsSync, writeFileSync, unlinkSync, renameSync } from 'fs';
import deepmerge from 'deepmerge';

import { packagePath, projectPath, arrayMerge } from './utils.js';

const { version } = JSON.parse(readFileSync(packagePath('./package.json')));

const j = projectPath('data.package.json');
const targetj = projectPath('package.json');

const abcSorting = (o) =>
  Object.fromEntries(Object.entries(o).sort(([ keyA ], [ keyB ]) => keyA.localeCompare(keyB)));

export const installPackageJSON = () => {
  if (!existsSync(targetj)) {
    renameSync(j, targetj);
    return;
  }

  const tJSON = JSON.parse(readFileSync(j));
  const targetJSON = JSON.parse(readFileSync(targetj));

  const json = deepmerge.all([
    tJSON,
    targetJSON,
    {
      scripts: {
        'install-compiler': `npx sa-bright-compiler@${version}`,
        'update-compiler': 'npx sa-bright-compiler'
      },
      dependencies: tJSON.dependencies,
      devDependencies: targetJSON.devDependencies
    }
  ], { arrayMerge });
  
  writeFileSync(targetj, JSON.stringify({
    ...json,
    dependencies: abcSorting(json.dependencies),
    devDependencies: abcSorting(json.devDependencies)
  }, null, 2) + '\r\n');
  unlinkSync(j);
};