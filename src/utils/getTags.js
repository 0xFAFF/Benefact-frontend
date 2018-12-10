const getTags = (tagsList = {}, tagIds = []) => {
  const foundTags = [];
  tagIds.forEach(id => {
    const tag = tagsList.find(tag => id === tag.id);
    if (tag) {
      foundTags.push(tag);
    }
  });
  // return tagsList.filter(tag => tagIds.some(id => id === tag.id));
  return foundTags;
};

export default getTags;
