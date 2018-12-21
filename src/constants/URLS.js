const baseURL = "http://benefact.faffgames.com/api/";

const URLS = (type, action) => {
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

  return `${baseURL}${urlKeyMap[type][action]}`;
};

export default URLS;
