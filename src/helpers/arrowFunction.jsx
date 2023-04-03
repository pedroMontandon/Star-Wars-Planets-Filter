const arrowFunction = (sortedData, name) => {
  if (!sortedData) return '';
  const { order: { column, sort } } = sortedData;

  if (column === name) return sort === 'ASC' ? '⇧' : '⇩';

  return '';
};

export default arrowFunction;

// https://www.toptal.com/designers/htmlarrows/arrows/
