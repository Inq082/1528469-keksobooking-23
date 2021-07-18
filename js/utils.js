const getRussianDeclension = function (count, variants) {
  const limitOfHundred = count % 100;
  const limitOfTen = count % 10;

  if (limitOfHundred > 10 && limitOfHundred < 20) {
    return variants[2];
  }
  if (limitOfTen > 1 && limitOfTen < 5) {
    return variants[1];
  }
  if (limitOfTen === 1) {
    return variants[0];
  }

  return variants[2];
};
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
export {debounce, isEscEvent, getRussianDeclension};
