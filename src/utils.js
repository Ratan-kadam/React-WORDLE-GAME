const pushWord = (currWord, words, index) => {
  const newArray = [
    ...words.slice(0, index),
    currWord,
    ...words.slice(index + 1),
  ];
  return newArray;
};

export { pushWord };
