//Округляем до целого,max и min включаются
export function getRandomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//убираем округление и добавляем к параметрам условие указания количество знаков после запятой
export function getRandomNumberPoint(min, max, point){
  return (Math.random() * (max - min + 1) + min).toFixed(point);
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
