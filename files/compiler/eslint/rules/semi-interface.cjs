const { meta: { schema, messages }, create } = require('eslint/lib/rules/semi');

module.exports = {
  meta: {
    type: 'layout',
    fixable: 'code',
    schema,
    messages
  },
  create(context) {
    const rules = create(context);

    return {
      ...rules,
      TSInterfaceDeclaration: rules.ExpressionStatement,
      TSEnumDeclaration: rules.ExpressionStatement,
      ExportDefaultDeclaration(node) {
        if (node.declaration.type !== 'TSInterfaceDeclaration') {
          rules.ExportDefaultDeclaration(node);
        }
        if (node.declaration.type !== 'TSEnumDeclaration') {
          rules.ExportDefaultDeclaration(node);
        }
      }
    };
  }
};
