const parseQuery = queryString => {
  let query = {};
  let pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
  pairs.forEach(pair => {
    const splitPair = pair.split("=");
    query[decodeURIComponent(splitPair[0])] = decodeURIComponent(splitPair[1] || "");
  });
  return query;
};

export default parseQuery;
