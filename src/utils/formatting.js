import moment from "moment";
import _ from "lodash";

export const formatTime = time => moment.unix(time).format("MMM D [at] h:mm A z");

export const camelCase = obj => {
  var camelCaseObject = {};
  var camelCaseArray = [];
  if(_.isObject(obj) || _.isArguments(obj)) {
    _.forEach(obj, (value, key) => {
      if (_.isPlainObject(value) || _.isArray(value)) {
        // checks that a value is a plain object or an array - for recursive key conversion
        value = camelCase(value); // recursively update keys of any values that are also objects
      }
      if (_.isArray(obj)) camelCaseArray.push(value);
      else camelCaseObject[_.camelCase(key)] = value;
    });
    if (_.isArray(obj)) return camelCaseArray;
    else return camelCaseObject;
  }
  return obj;
};

export const parseQuery = queryString => {
  if(queryString === undefined) queryString = document.location.search;
  let query = {};
  let pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
  pairs.forEach(pair => {
    const splitPair = pair.split("=");
    query[decodeURIComponent(splitPair[0])] = decodeURIComponent(splitPair[1] || "");
  });
  return query;
};

export const parseToken = (token = "") => {
  const base64parts = token.split(".");
  if (Array.isArray(base64parts) && base64parts.length === 3)
    return JSON.parse(window.atob(base64parts[1].replace(/-/g, "+").replace(/_/g, "/")));
  return "";
};

export const cls = (...args) => {
  return args.filter(a => Boolean(a)).join(" ");
}

