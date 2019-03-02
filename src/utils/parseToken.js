const parseToken = (token = "") => {
  const base64urlArray = token.split(".");
  const base64Url = Array.isArray(base64urlArray) ? base64urlArray[1] : "";
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  if (base64) JSON.parse(window.atob(base64));
  return "";
};

export default parseToken;
