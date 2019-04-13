const STATUS_ERRORS = status => {
  const statusMap = {
    401: "Incorrect username / password",
    403: "Unverified email"
  };
  return statusMap[status];
};

export default STATUS_ERRORS;
