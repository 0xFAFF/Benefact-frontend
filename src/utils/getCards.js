const getCards = (list, matchingId) =>
  list.filter(card => card.columnId === matchingId);

export default getCards;
