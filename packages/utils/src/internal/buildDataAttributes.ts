export type DataAttributeMap = Record<string, string | number | boolean>;

export const buildDataAttributes = (
  data: DataAttributeMap = {}
): DataAttributeMap => {
  const keys = Object.keys(data);
  const dataAttributes: DataAttributeMap = {};

  for (const key of keys) {
    /**
     * NOTE: lowercase keys to support property value shorthand
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
     *
     * @example
     * const { testId } = props
     * buildDataAttributes({ testId }) // data-testid="value"
     *
     */
    dataAttributes[`data-${key.toLocaleLowerCase()}`] = data[key];
  }

  return dataAttributes;
};
