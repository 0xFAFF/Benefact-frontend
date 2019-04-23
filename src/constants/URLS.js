const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/" // Don't change this
    : "https://staging.benefact.dev/api/";

const urlKeyMap = {
  cards: {
    GET: {
      url: "board/{boardId}/"
    },
    UPDATE: {
      url: "board/{boardId}/cards/update",
      whiteList: ["id", "index", "columnId", "tagIds", "description"]
    },
    ADD: {
      url: "board/{boardId}/cards/add"
    },
    DELETE: {
      url: "board/{boardId}/cards/delete"
    }
  },
  columns: {
    UPDATE: {
      url: "board/{boardId}/columns/update",
      whiteList: ["id", "index", "title"]
    },
    ADD: {
      url: "board/{boardId}/columns/add"
    },
    DELETE: {
      url: "board/{boardId}/columns/delete"
    }
  },
  tags: {
    UPDATE: {
      url: "board/{boardId}/tags/update",
      whiteList: ["id", "name", "color", "character"]
    },
    ADD: {
      url: "board/{boardId}/tags/add"
    },
    DELETE: {
      url: "board/{boardId}/tags/delete"
    }
  },
  users: {
    GET: {
      url: "users/auth"
    },
    ADD: {
      url: "users/add"
    },
    SEND_VERIFICATION: {
      url: "users/sendverification"
    },
    VERIFY: {
      url: "users/verify"
    }
  },
  comments: {
    ADD: {
      url: "board/{boardId}/comments/add"
    },
    DELETE: {
      url: "board/{boardId}/comments/delete"
    },
    UPDATE: {
      url: "board/{boardId}/comments/update",
      whiteList: ["id", "text"]
    }
  },
  votes: {
    UPDATE: {
      url: "board/{boardId}/cards/vote"
    }
  },
  files: {
    GET: {
      url: "board/{boardId}/files/{fileId}"
    },
    ADD: {
      url: "board/{boardId}/files/add"
    },
    DELETE: {
      url: "board/{boardId}/files/delete"
    }
  }
};

function URLS(type, action, urlParams = {}) {
  let urlEntry = urlKeyMap[type][action];
  let url = `${baseURL}${urlEntry.url}`.replace(/{(.*?)}/g, (_, m) => urlParams[m]);
  return { name: url, ...urlEntry };
}

export default URLS;
