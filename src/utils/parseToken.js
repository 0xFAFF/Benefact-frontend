const parseToken = (token = "") => {
  const base64parts = token.split(".");
  if (Array.isArray(base64parts) && base64parts.length === 3)
    return JSON.parse(window.atob(base64parts[1].replace(/-/g, "+").replace(/_/g, "/")));
  return "";
};

export default parseToken;
