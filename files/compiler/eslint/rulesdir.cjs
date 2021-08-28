const fs = require('fs');
const path = require('path');

const cache = {};
module.exports = {
  get rules() {
    const RULES_DIR = 'compiler/eslint/rules';
    const cacheKey = JSON.stringify(RULES_DIR);
    if (!cache[cacheKey]) {
      const rules = Array.isArray(RULES_DIR) ? RULES_DIR : [ RULES_DIR ];
      const rulesObject = {};
      rules.forEach((rulesDir) => {
        fs.readdirSync(rulesDir)
          .filter((filename) => filename.endsWith('.cjs'))
          .map((filename) => path.resolve(rulesDir, filename))
          .forEach((absolutePath) => {
            const ruleName = path.basename(absolutePath, '.cjs');
            if (rulesObject[ruleName]) {
              throw new Error(`eslint-plugin-rulesdir found two rules with the same name: ${ ruleName }`);
            }
            rulesObject[ruleName] = require(absolutePath);
          });
      });
      cache[cacheKey] = rulesObject;
    }

    return cache[cacheKey];
  }
};
