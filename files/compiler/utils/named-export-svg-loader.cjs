const path = require('path');

const camelCase = require('camelcase');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = function (code) {
  const name = capitalize(camelCase(path.basename(this.resourcePath, '.svg')));

  return code.replace('export default', `export const Svg${ name } =`);
};
