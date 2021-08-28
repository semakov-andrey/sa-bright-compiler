const { parseForESLint } = require('@typescript-eslint/parser');

exports.parseForESLint = function (code, options) {
  const result = parseForESLint(code, options);
  const { body } = result.ast;
  result.ast.body = body.reduce((acc, statement, index) => {
    const { type, declaration, range } = statement;
    const { type: nextType, range: nextRange } = body[index + 1] || {};
    if (
      type === 'ExportNamedDeclaration'
        && declaration
        && (declaration.type === 'TSInterfaceDeclaration' || declaration.type === 'TSEnumDeclaration')
        && declaration.range
        && Array.isArray(range)
        && nextType === 'EmptyStatement'
        && Array.isArray(nextRange)
    ) {
      statement.range = [ range[0], range[1] + 1 ];
      statement.declaration.range = [ declaration.range[0], declaration.range[1] + 1 ];
      result.ast.body[index + 1].range = [ range[1] + 1, range[1] + 1 ];
    }
    if (
      (type === 'TSInterfaceDeclaration' || type === 'TSEnumDeclaration')
        && Array.isArray(range)
        && nextType === 'EmptyStatement'
        && Array.isArray(nextRange)
    ) {
      statement.range = [ range[0], range[1] + 1 ];
      result.ast.body[index + 1].range = [ range[1] + 1, range[1] + 1 ];
    }
    acc.push(statement);

    return acc;
  }, []).filter(({ type, range: { pos, end } }) => type !== 'EmptyStatement' && pos === end);

  return result;
};
