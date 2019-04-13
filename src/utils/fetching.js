import PropTypes from "prop-types";
import { titleCase, notifyToast } from "../utils";
import { FetchError } from "../constants";

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

  const handleErrors = res => {
    if (!res.ok) {
      notifyToast("error", res.statusText);
      throw new FetchError(res.status, res.statusText, res.statusText);
    }
    return res;
  };

  const handleSuccess = res => {
    return res.json().then(res => {
      return {
        hasError: false,
        data: res
      };
    });
  };

  const data = await fetch(urlName, options)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(error => {
      console.log(error.info);
      return {
        hasError: true,
        error
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
