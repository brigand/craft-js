import fromValue from '../fromValue';

it(`basic types`, () => {
  expect(fromValue('foo').unwrap()).toMatchObject({
    type: 'StringLiteral',
    value: 'foo',
  });
  expect(fromValue(123).unwrap()).toMatchObject({
    type: 'NumericLiteral',
    value: 123,
  });
  expect(fromValue(null).unwrap()).toMatchObject({
    type: 'NullLiteral',
  });
  expect(fromValue(undefined).unwrap()).toMatchObject({
    type: 'Identifier',
    name: 'undefined',
  });
});

it(`objects generate properly`, () => {
  const expSrc = `{
    str1: 'foo',
    obj1: {
      prop1: 42,
    },
    arr1: [
      9001,
      {
        SENTINEL: true,
        prop2: [
          'foo',
          null,
          {prop3: undefined},
        ],
      }
    ],
  }`;

  // Get expected as a js value and an array of tokens
  const expValue = eval(`(${expSrc})`);
  const expTok = tokenize(expSrc);

  // Get the same three values for the generated result
  const genSrc = fromValue(expValue).toJs();
  const genTok = tokenize(genSrc);
  const genValue = eval(`(${genSrc})`);

  // Sanity checks
  expect(genSrc).toContain('SENTINEL');
  expect(genTok).toContainEqual({ type: 'ident', value: 'SENTINEL' });

  expect(genTok).toEqual(expTok);
  expect(genValue).toEqual(expValue);
});

function tokenize(str) {
  const res = [];
  const exprs = {
    str: /['"][^'"]*['"]/,
    num: /[0-9.]+/,
    obj_start: /\{/,
    obj_end: /\{/,
    arr_start: /\[/,
    arr_end: /]/,
    ident: /[A-Za-z_$][A-Za-z_$0-9]+/,
    colon: /:/,
  };

  const [keys, values] = [Object.keys(exprs), Object.values(exprs)];
  const regex = new RegExp(values.map((x) => `(${x.source})`).join('|'), 'g');
  str.replace(regex, (m, ...groups) => {
    const index = groups.findIndex((x) => x);
    const value = groups[index].replace(/['"`]/g, `'`);
    res.push({ type: keys[index], value });
  });
  return res;
}
