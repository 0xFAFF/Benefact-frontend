import { titleCase } from "../utils";

const fetching = async (url, method, queryParams, token) => {
  let options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (queryParams) {
    options = { ...options, body: JSON.stringify(titleCase(queryParams)) };
  }

  if (token) {
    options.headers["Authorization"] = "Bearer " + token;
  }

  const data = await fetch(url, options)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Something went wrong");
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

export default fetching;
