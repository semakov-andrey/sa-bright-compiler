const path = require('path');
const fs = require('fs');
const camelCase = require('camelcase');
const packageJSON = require('../../package.json');

const { config: { directories: dirs } } = packageJSON;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

let icons = [];
const getIconsDTS = (icons) => `declare module '*.svg' {
  type IconsProps = { className: string };
  ${ icons.map((icon) => `const ${ icon }: React.ComponentType<IconsProps>;`).join('\r\n  ') }
  export { ${ icons.join(', ') } };
}
`;

module.exports = function (code) {
  const name = capitalize(camelCase(path.basename(this.resourcePath, '.svg')));
  const newName = `Svg${ name }`;

  if (!icons.includes(newName)) {
    icons = [ ...icons, newName ].sort();
    const filePath = path.resolve(__dirname, `../../${ dirs.source }/utils/icons.d.ts`);
    fs.writeFileSync(filePath, getIconsDTS(icons));
  }

  return code.replace('export default', `export const ${ newName } =`);
};
