const path = require('path');

const camelCase = require('camelcase');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = function (code) {
  const name = capitalize(camelCase(path.basename(this.resourcePath, '.css')));

  return code
    .replace(
      /export default (\{[\S\s]*\});/u,
      `var code=$1;export const css = code;export const css${ name } = code;`
    );
};
