import camelCase from "lodash.camelcase";

const toCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamel(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamel(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

export default toCamel;
