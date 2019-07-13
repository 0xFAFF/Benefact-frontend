import moment from "moment";

export const formatTime = time => moment.unix(time).format("MMM D [at] h:mm A z");

export function isEmpty(value){
  return  value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
}

const toCamelCase = key => key.charAt(0).toLowerCase() + key.slice(1);
const toTitleCase = key => key.charAt(0).toUpperCase() + key.slice(1);

const keyApply = (obj, keyFunc) => {
  if(!obj) return obj;
  if(obj.__proto__ === Object.prototype) {
    var camelCaseObject = {};
    for(var key in obj) {
      camelCaseObject[keyFunc(key)] = camelCase(obj[key]);
    }
    return camelCaseObject;
  }
  if(obj.__proto__ === Array.prototype) {
    return obj.map(camelCase);
  }
  return obj;
};

export const camelCase = obj => keyApply(obj, toCamelCase);
export const titleCase = obj => keyApply(obj, toTitleCase);

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

