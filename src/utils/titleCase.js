import _ from "lodash";

const toTitleCase = value =>
  value.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1));

const objectKeysToTitleCase = obj => {
  var titleCaseObject = {};
  var titleCaseArray = [];
  _.forEach(obj, (value, key) => {
    if (_.isPlainObject(value) || _.isArray(value)) {
      // checks that a value is a plain object or an array - for recursive key conversion
      value = objectKeysToTitleCase(value); // recursively update keys of any values that are also objects
    }
    if (_.isArray(obj)) titleCaseArray.push(value);
    else titleCaseObject[toTitleCase(key)] = value;
  });
  if (_.isArray(obj)) return titleCaseArray;
  else return titleCaseObject;
};

export default objectKeysToTitleCase;
