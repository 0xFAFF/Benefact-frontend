const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/" // Don't change this
    : // : "https://staging.benefact.dev/api/";
      "http://localhost/api/";
export interface URLType {
  url: string;
  whiteList?: Array<string>;
}
const urlKeyMap: { [type: string]: { [action: string]: URLType } } = {
  cards: {
    GET: {
      url: "boards/{boardId}/"
    },
    UPDATE: {
      url: "boards/{boardId}/cards/update",
      whiteList: ["id", "title", "index", "columnId", "tagIds", "description", "assigneeId"]
    },
    ADD: {
      url: "boards/{boardId}/cards/add"
    },
    DELETE: {
      url: "boards/{boardId}/cards/delete"
    },
    ARCHIVE: {
      url: "boards/{boardId}/cards/archive"
    },
    MOVE: {
      url: "boards/{boardId}/cards/move"
    }
  },
  columns: {
    UPDATE: {
      url: "boards/{boardId}/columns/update",
      whiteList: ["id", "index", "title", "state", "allowContribution"]
    },
    ADD: {
      url: "boards/{boardId}/columns/add"
    },
    DELETE: {
      url: "boards/{boardId}/columns/delete"
    }
  },
  tags: {
    UPDATE: {
      url: "boards/{boardId}/tags/update",
      whiteList: ["id", "name", "color", "character"]
    },
    ADD: {
      url: "boards/{boardId}/tags/add"
    },
    DELETE: {
      url: "boards/{boardId}/tags/delete"
    }
  },
  users: {
    AUTH: {
      url: "users/auth"
    },
    GET: {
      url: "users/get"
    },
    ADD: {
      url: "users/add"
    },
    SEND_VERIFICATION: {
      url: "users/sendverification"
    },
    VERIFY: {
      url: "users/verify"
    },
    CURRENT: {
      url: "users/current"
    },
    CHANGE_PASSWORD: {
      url: "users/changepassword"
    },
    RESET_PASSWORD: {
      url: "users/sendpasswordreset"
    }
  },
  comments: {
    ADD: {
      url: "boards/{boardId}/comments/add"
    },
    DELETE: {
      url: "boards/{boardId}/comments/delete"
    },
    UPDATE: {
      url: "boards/{boardId}/comments/update",
      whiteList: ["id", "text"]
    }
  },
  votes: {
    UPDATE: {
      url: "boards/{boardId}/cards/vote"
    }
  },
  files: {
    GET: {
      url: "boards/{boardId}/files/{fileId}"
    },
    ADD: {
      url: "boards/{boardId}/files/add"
    },
    DELETE: {
      url: "boards/{boardId}/files/delete"
    }
  },
  boards: {
    JOIN: {
      url: "boards/{boardId}/join"
    },
    UPDATE: {
      url: "boards/{boardId}/update"
    },
    DELETE: {
      url: "boards/{boardId}/delete"
    },
    INVITE: {
      url: "boards/{boardId}/invite"
    },
    SET_PRIVILEGE: {
      url: "boards/{boardId}/setprivilege"
    }
  },
  board: {
    ADD: {
      url: "board/create"
    },
    TRELLO_IMPORT: {
      url: "board/trello_import"
    }
  }
};

function URLS(type: string, action: string, urlParams = {} as { [key: string]: any }) {
  let urlEntry = { ...urlKeyMap[type][action] } as URLType;
  urlEntry.url = `${baseURL}${urlEntry.url}`.replace(/{(.*?)}/g, (_, m) => urlParams[m]);
  return urlEntry;
}

export default URLS;
