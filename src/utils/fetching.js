import PropTypes from "prop-types";
import { titleCase, notifyToast } from "../utils";
import { STATUS_ERRORS } from "../constants";

const fetching = async (url, queryParams, token) => {
  const {
    name: urlName,
    whiteList: urlWhiteList = null,
    method = "POST"
  } = url;
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
      const { status } = res;
      notifyToast("error", STATUS_ERRORS(status), "top-center");
      throw new Error(res.statusText);
    }
    return res;
  };

  const handleSuccess = res => {
    return res.json().then(res => {
      return {
        data: res
      };
    });
  };

  const data = await fetch(urlName, options)
    .then(handleErrors)
    .then(handleSuccess)
    .catch(error => {
      return {
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
  token: PropTypes.string
};

export default fetching;
