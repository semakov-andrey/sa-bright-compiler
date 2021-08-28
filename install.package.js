import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'fs';
import deepmerge from 'deepmerge';

import { packagePath, projectPath } from './utils.js';

const { version } = JSON.parse(readFileSync(packagePath('./package.json')));

const pj = projectPath('data.package.json');
const targetpj = projectPath('package.json');

const arrayMerge = (destinationArray, sourceArray) =>
  Array.from(new Set([ ...destinationArray, ...sourceArray ]));

const abcSorting = (o) =>
  Object.fromEntries(Object.entries(o).sort(([ keyA ], [ keyB ]) => keyA.localeCompare(keyB)));

export const installPackageJSON = () => {
  if (!existsSync(targetpj)) return;

  const pJSON = JSON.parse(readFileSync(pj));
  const targetpJSON = JSON.parse(readFileSync(targetpj));

  const json = deepmerge.all([
    pJSON,
    targetpJSON,
    {
      scripts: {
        'install-compiler': `npx sa-bright-compiler@${version}`,
        'update-compiler': 'npx sa-bright-compiler'
      },
      dependencies: pJSON.dependencies,
      devDependencies: targetpJSON.devDependencies
    }
  ], { arrayMerge });
  
  writeFileSync(targetpj, JSON.stringify({
    ...json,
    dependencies: abcSorting(json.dependencies),
    devDependencies: abcSorting(json.devDependencies)
  }, null, 2) + '\r\n');
  unlinkSync(pj);
};