import { types as t } from 'babel-core';
import Thing from './Thing';

function valueToAstNode(value) {
  if (value === undefined) return t.identifier('undefined');
  if (value === null) return t.nullLiteral();
  if (typeof value === 'string') return t.stringLiteral(value);
  if (typeof value === 'number') return t.numericLiteral(value);
  if (typeof value === 'boolean') return t.booleanLiteral(value);

  if (Array.isArray(value)) {
    return t.arrayExpression(value.map((x) => valueToAstNode(x)));
  }

  return t.objectExpression(
    Object.entries(value).map(([k, v]) =>
      t.objectProperty(t.identifier(k), valueToAstNode(v)),
    ),
  );
}

function fromValue(value) {
  return new Thing(valueToAstNode(value), ['AstNode']);
}

export default fromValue;
