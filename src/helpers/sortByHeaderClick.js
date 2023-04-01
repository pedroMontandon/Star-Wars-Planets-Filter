const sortByClick = (sortedData, id) => {
  if (!sortedData) return { order: { column: id, sort: 'ASC' } };
  const { order: { sort } } = sortedData;
  return { order: { column: id, sort: sort === 'ASC' ? 'DESC' : 'ASC' } };
};

export default sortByClick;
