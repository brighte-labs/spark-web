/**
 * An alternative to `Object.keys()` that avoids type widening.
 *
 * @param {object} value Object containing keys to extract
 *
 * @example
 * Object.keys({ foo: 1, bar: 2 }) // string[]
 * typedKeys({ foo: 1, bar: 2 }) // ("foo" | "bar")[]
 */
export function typedKeys<T>(value: T) {
  return Object.keys(value) as Array<keyof T>;
}
