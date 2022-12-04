const isEqualObj = (first, second) => {
  return JSON.stringify(first) === JSON.stringify(second);
};

module.exports = isEqualObj;
