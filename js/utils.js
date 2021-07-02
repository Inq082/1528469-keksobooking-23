//Округляем до целого,max и min включаются
export function getRandomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//убираем округление и добавляем к параметрам условие указания количество знаков после запятой
export function getRandomNumberPoint(min, max, point){
  return (Math.random() * (max - min) + min).toFixed(point);
}
//Генерируем рандомный массив заданной длины
export function getArrayRandomLength(array, length) {
  const shufleArray = array.slice();
  let temporaryValue;
  let randomIndex;

  for (let currentIndex = shufleArray.length - 1; currentIndex > 0; currentIndex--) {
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    randomIndex = getRandomBetween(0, currentIndex);
    temporaryValue = shufleArray[currentIndex];
    shufleArray[currentIndex] = shufleArray[randomIndex];
    shufleArray[randomIndex] = temporaryValue;
  }
  shufleArray.length = length;
  return shufleArray;
}
//генерируем окончания
export const endParam = function (count, variants) {
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
