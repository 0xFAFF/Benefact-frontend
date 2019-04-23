import PropTypes from "prop-types";
import { titleCase } from "../utils";

const fetching = async (url, queryParams, token) => {
  const { name: urlName, whiteList: urlWhiteList = null, method = "POST" } = url;
  let options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (queryParams) {
    if (queryParams.__proto__ !== FormData.prototype) {
      let whiteListedParams = {};
      if (!urlWhiteList) {
        whiteListedParams = { ...queryParams };
      } else {
        urlWhiteList.forEach(field => {
          if (field in queryParams) {
            whiteListedParams = {
              ...whiteListedParams,
              [field]: queryParams[field]
            };
          }
        });
      }
      queryParams = JSON.stringify(titleCase(whiteListedParams));
    }
    else{
      delete options.headers["Content-Type"];
    }
    options.body = queryParams;
  }

  if (token) {
    options.headers["Authorization"] = "Bearer " + token;
  }

  return await fetch(urlName, options);
};

fetching.propTypes = {
  url: PropTypes.shape({
    name: PropTypes.string,
    whiteList: PropTypes.array
  }),
  queryParams: PropTypes.object,
  token: PropTypes.string
};

export default fetching;
