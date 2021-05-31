//Округляем до целого,max и min включаются
function getRandomBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
//убираем округление и добавляем к параметрам условие указания количество знаков после запятой
function getRandomNumberBetween(min,max,point){

  return (Math.random()*(max-min+1)+min).toFixed (point);
}
