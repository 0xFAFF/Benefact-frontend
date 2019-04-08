import { titleCase } from "../utils";
import PropTypes from "prop-types";

const fetching = async (url, method, queryParams, token) => {
  const { name: urlName, whiteList: urlWhiteList } = url;
  let options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (queryParams) {
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

    options = {
      ...options,
      body: JSON.stringify(titleCase(whiteListedParams))
    };
  }

  if (token) {
    options.headers["Authorization"] = "Bearer " + token;
  }

  const data = await fetch(urlName, options)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(res => {
      return {
        hasError: false,
        data: res
      };
    })
    .catch(err => {
      return {
        hasError: true,
        message: err
      };
    });
  return data;
};

fetching.propTypes = {
  url: PropTypes.shape({
    name: PropTypes.string,
    whiteList: PropTypes.array
  }),
  queryParams: PropTypes.object,
  method: PropTypes.object,
  token: PropTypes.string
};

export default fetching;
