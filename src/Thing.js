import generate from 'babel-generator';

class Thing {
  constructor(value, traits = []) {
    this.value = value;
    this.traits = traits;
  }

  toJs() {
    const value = toValueDeep(this);
    return generate(value).code;
  }

  unwrap() {
    return this.value;
  }
}

export function toValue(t: Thing | any) {
  if (t instanceof Thing) return t.unwrap();
  return t;
}

export function toValueDeep(t: Thing | any) {
  const v = toValue(t);
  if (Array.isArray(v)) return v.map(toValueDeep);
  if (v && typeof v === 'object') {
    return Object.entries(v).reduce((acc, [k, v2]) => {
      acc[k] = toValueDeep(v2);
      return acc;
    }, {});
  }
  return v;
}

export default Thing;
