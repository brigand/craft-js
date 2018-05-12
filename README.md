craft-js aids in creating JavaScript source code programmatically.

## Install

```
yarn add @brigand/craft-js

# or
npm install --save @brigand/craft-js
```

## fromValue

Currently the only API available, `fromValue` allows you to convert a primitive
JS value to either a babel AST node, or JS source code.

```js
const { fromValue } = require('@brigand/craft-js');

const jsCode = fromValue({ x: 1, y: [2, 3] }).toJs();
console.log(jsCode);
```

This program produces the following output:

```
{
  x: 1,
  y: [2, 3]
}
```

To get at the inner value (a babel AST node in this case) you can call
`.unwrap()`.

```js
const node = fromValue({ x: 1, y: [2, 3] }).unwrap();
node; /* =>
{ type: 'ObjectExpression',
  properties:
   [ { type: 'ObjectProperty',
       key: { type: 'Identifier', name: 'x' },
       value: { type: 'NumericLiteral', value: 1 },
       computed: false,
       shorthand: false,
       decorators: null },
     { type: 'ObjectProperty',
       key: { type: 'Identifier', name: 'y' },
       value:
        { type: 'ArrayExpression',
          elements:
           [ { type: 'NumericLiteral', value: 2 },
             { type: 'NumericLiteral', value: 3 } ] },
       computed: false,
       shorthand: false,
       decorators: null } ] }
*/
```
