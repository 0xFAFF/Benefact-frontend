import { titleCase } from "../utils";

const fetching = async (url, queryParams, token) => {
  const { url: urlName, whiteList: urlWhiteList = null, keepCasing = false } = url;
  let options = {
    method: "POST",
    headers: {}
  };
  if (queryParams) {
    if (queryParams.__proto__ !== FormData.prototype) {
      options.headers["Content-Type"] = "application/json";
      let whiteListedParams = {};
      if (!urlWhiteList) {
        whiteListedParams = { ...queryParams };
      } else {
        urlWhiteList.forEach(field => {
          if (field in queryParams) {
            whiteListedParams[field] = queryParams[field];
          }
        });
      }
      queryParams = JSON.stringify(keepCasing ? whiteListedParams : titleCase(whiteListedParams));
    }
    options.body = queryParams;
  }

  if (token) {
    options.headers["Authorization"] = "Bearer " + token;
  }

  return await fetch(urlName, options);
};

export default fetching;
