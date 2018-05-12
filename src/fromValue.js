import { types as t } from 'babel-core';

function fromValue(value) {
  if (value === undefined) return t.identifier('undefined');
  if (value === null) return t.nullLiteral();
  if (typeof value === 'string') return t.stringLiteral(value);
  if (typeof value === 'number') return t.numericLiteral(value);
  if (typeof value === 'boolean') return t.booleanLiteral(value);

  if (Array.isArray(value)) {
    return t.arrayExpression(value.map((x) => fromValue(x)));
  }

  return t.objectExpression(
    Object.entries(value).map(([k, v]) =>
      t.objectProperty(t.identifier(k), fromValue(v)),
    ),
  );
}

export default fromValue;
