const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/" // Don't change this
    : "https://staging.benefact.app/api/";

const urlKeyMap = {
  cards: {
    GET: "cards",
    UPDATE: "updatecard",
    ADD: "addcard",
    DELETE: "deletecard"
  },
  columns: {
    UPDATE: "updatecolumn",
    ADD: "addcolumn",
    DELETE: "deletecolumn"
  },
  tags: {
    UPDATE: "updatetag",
    ADD: "addtag",
    DELETE: "deletetag"
  }
};

function URLS(type, action) {
  if (arguments.length === 0) {
    return baseURL;
  }
  return `${baseURL}${urlKeyMap[type][action]}`;
}

export default URLS;
