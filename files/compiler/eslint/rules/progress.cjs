const CLIOptions = require('eslint/lib/options');
const logUpdate = require('log-update');
const fg = require('fast-glob');

let options;
let files;
const fullPercents = 100;

module.exports = {
  create(context) {
    if (!options && process && process.argv) {
      try {
        options = CLIOptions.parse(process.argv);
        if (options && Array.isArray(options._)) {
          files = fg.sync(options._, {
            absolute: true,
            ignore: [ '**/node_modules/**', '**/build/**' ]
          }).sort();
        }
      } catch (error) {
        console.error(error.message);

        return {};
      }
    }
    if (!files) return {};

    const filePath = context.getFilename();
    const index = files.findIndex((file) => file === filePath);
    if (index === -1) return {};

    const progress = Math.ceil((index + 1) * fullPercents / files.length);
    logUpdate(`Linting progress: ${ fullPercents !== progress ? `${ progress }%` : 'done' }`);

    return {};
  }
};
