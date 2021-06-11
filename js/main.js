//Округляем до целого,max и min включаются
function getRandomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
getRandomBetween(2, 10);//temporary
//убираем округление и добавляем к параметрам условие указания количество знаков после запятой
function getRandomNumberPoint(min, max, point){

  return (Math.random() * (max - min + 1) + min).toFixed(point);
}
getRandomNumberPoint(2, 10, 4);//temporary
//Генерируем рандомный массив заданной длины
function getArrayRandomLength(array, length) {
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

const offerTitle = [
  'Большой дворец',
  'Небольшой дворец',
  'Огромная квартира',
  'Маленькая квартира',
  'Красивый домик',
  'Некрасивый домик',
  'Уютное бунгало',
  'Неуютное бунгало',
  'Апарт отель',
  'Хостел'];
const offerType = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const offerCheckIn = ['12:00', '13:00', '14:00'];
const offerCheckOut = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const offerPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
// Генерируем объект
const createObject = function (index) {
  const objectRoom = {
    author: {
      avatar: 'img/avatars/user $(index < 10 ? '0' : '') $(index + 1) $.png'
    },
    offer : {
      title : offerTitle[index],
      address : getRandomNumberPoint(35.65000, 35.70000, 5) + ', ' + getRandomNumberPoint(139.70000 , 139.80000, 5),
      price : getRandomBetween(100, 1000000),
      type : offerType[getRandomBetween(0, offerType.length - 1)],
      rooms : getRandomBetween(1, 7),
      guests : getRandomBetween(1, 20),
      checkin : offerCheckIn[getRandomBetween(0, offerCheckIn.length - 1)],
      checkout : offerCheckOut[getRandomBetween(0, offerCheckOut.length - 1)],
      // Случайное кол-во, случаные значения, не должны повторяться
      features : getArrayRandomLength(offerFeatures, getRandomBetween(1, offerFeatures.length - 1)),
      description : '',
      // Случайная длина
      photos : getArrayRandomLength(offerPhotos, offerPhotos.length)
    },

    location: {
      lat : getRandomNumberPoint(35.65000, 35.70000, 5),
      lng : getRandomNumberPoint(139.70000 , 139.80000, 5)
    }
  };
  return objectRoom;
};
