const getCards = (list, matchingId, adapter = null) =>
  list.filter(card => adapter + card.columnId === matchingId);

export default getCards;
