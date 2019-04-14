import _ from "lodash";

const objectKeysToCamelCase = obj => {
  var camelCaseObject = {};
  var camelCaseArray = [];
  if(_.isObject(obj) || _.isArguments(obj)) {
    _.forEach(obj, (value, key) => {
      if (_.isPlainObject(value) || _.isArray(value)) {
        // checks that a value is a plain object or an array - for recursive key conversion
        value = objectKeysToCamelCase(value); // recursively update keys of any values that are also objects
      }
      if (_.isArray(obj)) camelCaseArray.push(value);
      else camelCaseObject[_.camelCase(key)] = value;
    });
    if (_.isArray(obj)) return camelCaseArray;
    else return camelCaseObject;
  }
  return obj;
};

export default objectKeysToCamelCase;
