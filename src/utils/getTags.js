const getTags = (tagsList, tagIds = []) => {
  return tagsList.filter(tag => tagIds.some(id => id === tag.id));
};

export default getTags;
