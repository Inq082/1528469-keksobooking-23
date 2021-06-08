//Округляем до целого,max и min включаются
function getRandomBetween(min, max){
  return Math.floor(Math.random() * (max-min + 1)+min);
}
getRandomBetween(2,10);//temporary
//убираем округление и добавляем к параметрам условие указания количество знаков после запятой
function getRandomNumberPoint(min, max, point){

  return (Math.random() * (max-min + 1)+min).toFixed(point);
}
getRandomNumberPoint(2,10,4);//temporary
