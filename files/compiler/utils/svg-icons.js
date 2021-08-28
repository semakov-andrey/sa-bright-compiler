import fs from 'fs/promises';
import path from 'path';

import camelCase from 'camelcase';

import { capitalize, dirname } from './common.js';

const getIconsDTS = (icons) => `declare module '*.svg' {
  type IconsProps = { className: string };
  ${ icons.map((icon) => `const ${ icon }: React.ComponentType<IconsProps>;`).join('\r\n  ') }
  export { ${ icons.join(', ') } };
}
`;

export class SvgIcons {
  icons = [];

  constructor(
    folder = 'src',
    iconsFolder = '',
    outputFile = '',
    root = path.resolve(dirname(import.meta.url), '../../')
  ) {
    this.folder = folder;
    this.iconsFolder = iconsFolder;
    this.outputFile = outputFile;
    this.root = root;
  }

  start = async () => {
    const iconsPath = path.resolve(this.root, this.folder, this.iconsFolder);
    const outputPath = path.resolve(this.root, this.folder, this.outputFile);
    try {
      await fs.access(iconsPath);
      const files = await fs.readdir(iconsPath);
      this.icons = files
        .filter((file) => path.extname(file) === '.svg')
        .map((file) => `Svg${ capitalize(camelCase(path.basename(file, '.svg'))) }`);
      fs.writeFile(outputPath, getIconsDTS(this.icons));
    } catch (e) {
      console.error(`Directory doesn't exists`);
    }
  }
}
