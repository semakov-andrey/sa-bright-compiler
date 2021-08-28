import { readFileSync, existsSync, writeFileSync, unlinkSync, renameSync } from 'fs';
import deepmerge from 'deepmerge';

import { projectPath, arrayMerge } from './utils.js';

const mergeIgnores = (i, targeti) => {
  const TEXT = String(readFileSync(i)).trim().split('\n');
  const targetTEXT = String(readFileSync(targeti)).trim().split('\n');
  writeFileSync(
    targeti,
    arrayMerge(TEXT, targetTEXT).join('\n') + '\r\n'
  );
}

export const installIgnores = () => {
  const gi = projectPath('data.gitignore');
  const ei = projectPath('data.eslintignore');
  const si = projectPath('data.stylelintignore');
  const targetgi = projectPath('.gitignore');
  const targetei = projectPath('.eslintignore');
  const targetsi = projectPath('.stylelintignore');

  [
    [ gi, targetgi ],
    [ ei, targetei ],
    [ si, targetsi ]
  ].forEach(([ i, targeti ]) => {
    if (!existsSync(targeti)) renameSync(i, targeti);
    else {
      mergeIgnores(i, targeti);
      unlinkSync(i);
    }
  });
}