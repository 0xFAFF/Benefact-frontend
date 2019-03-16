const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/" // Don't change this
    : "https://staging.benefact.app/api/";

const urlKeyMap = {
  cards: {
    GET: "cards",
    UPDATE: "cards/update",
    ADD: "cards/add",
    DELETE: "cards/delete"
  },
  columns: {
    UPDATE: "columns/update",
    ADD: "columns/add",
    DELETE: "columns/delete"
  },
  tags: {
    UPDATE: "tags/update",
    ADD: "tags/add",
    DELETE: "tags/delete"
  },
  users: {
    GET: "users/auth",
    ADD: "users/add"
  },
  comments: {
    ADD: "comments/add",
    DELETE: "comments/delete",
    UPDATE: "comments/update"
  },
  votes: {
    UPDATE: "cards/vote"
  }
};

function URLS(type, action) {
  if (arguments.length === 0) {
    return baseURL;
  }
  return `${baseURL}${urlKeyMap[type][action]}`;
}

export default URLS;
