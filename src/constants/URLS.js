const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/" // Don't change this
    : "https://staging.benefact.dev/api/";

const urlKeyMap = {
  cards: {
    GET: {
      url: "cards",
      whiteList: null
    },
    UPDATE: {
      url: "cards/update",
      whiteList: ["id", "index", "columnId", "tagIds", "description"]
    },
    ADD: {
      url: "cards/add",
      whiteList: null
    },
    DELETE: {
      url: "cards/delete",
      whiteList: null
    }
  },
  columns: {
    UPDATE: {
      url: "columns/update",
      whiteList: ["id", "index", "title"]
    },
    ADD: {
      url: "columns/add",
      whiteList: null
    },
    DELETE: {
      url: "columns/delete",
      whiteList: null
    }
  },
  tags: {
    UPDATE: {
      url: "tags/update",
      whiteList: ["id", "name", "color", "character"]
    },
    ADD: {
      url: "tags/add",
      whiteList: null
    },
    DELETE: {
      url: "tags/delete",
      whiteList: null
    }
  },
  users: {
    GET: {
      url: "users/auth",
      whiteList: null
    },
    ADD: {
      url: "users/add",
      whiteList: null
    }
  },
  comments: {
    ADD: {
      url: "comments/add",
      whiteList: null
    },
    DELETE: {
      url: "comments/delete",
      whiteList: null
    },
    UPDATE: {
      url: "comments/update",
      whiteList: ["id", "text"]
    }
  },
  votes: {
    UPDATE: {
      url: "cards/vote",
      whiteList: null
    }
  }
};

function URLS(type, action) {
  if (arguments.length === 0) {
    return {
      name: baseURL,
      whiteList: []
    };
  }
  return {
    name: `${baseURL}${urlKeyMap[type][action]["url"]}`,
    whiteList: urlKeyMap[type][action]["whiteList"]
  };
}

export default URLS;
