const translate = (word) => {
  if (word === 'igual a') return 'equal to';
  if (word === 'maior que') return 'greater than';
  if (word === 'menor que') return 'less than';
  return word;
};

export default translate;
