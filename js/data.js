import {getRandomBetween, getRandomNumberPoint, getArrayRandomLength} from './utils.js';
const QUANTITY_OFFERS = 10;
const OFFER_TITLE = [
  'Большой дворец',
  'Небольшой дворец',
  'Огромная квартира',
  'Маленькая квартира',
  'Красивый домик',
  'Некрасивый домик',
  'Уютное бунгало',
  'Неуютное бунгало',
  'Апарт отель',
  'Хостел',
];
/*const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];*/
const OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
export const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
export const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
export const OFFER_ROOM = ['комната', 'комнаты', 'комнат'];
export const OFFER_GUEST = ['гостя', 'гостей', 'гостей'];
export const TITLE_LENGTH = ['символ', 'символа', 'символов'];
// Генерируем объект
const createObject = function(index) {
  const lat = getRandomNumberPoint(35.65000, 35.70000, 5);
  const lng = getRandomNumberPoint(139.70000 , 139.80000, 5);
  const objectRoom = {
    author: {
      avatar: `img/avatars/user${index < 9 ? '0' : ''}${index + 1}.png`,
    },
    offer : {
      title : OFFER_TITLE[index],
      address: `${lat},${lng}`,
      price : getRandomBetween(100, 1000000),
      type : OFFER_TYPE[getRandomBetween(0, OFFER_TYPE.length - 1)],
      rooms : getRandomBetween(1, 7),
      guests : getRandomBetween(1, 20),
      checkin : OFFER_CHECKIN[getRandomBetween(0, OFFER_CHECKIN.length - 1)],
      checkout : OFFER_CHECKOUT[getRandomBetween(0, OFFER_CHECKOUT.length - 1)],
      // Случайное кол-во, случаные значения, не должны повторяться
      features : getArrayRandomLength(OFFER_FEATURES, getRandomBetween(1, OFFER_FEATURES.length - 1)),
      description : '',
      // Случайная длина
      photos : getArrayRandomLength(OFFER_PHOTOS, OFFER_PHOTOS.length),
    },

    location: {
      x : lat,
      y : lng,
    },
  };
  return objectRoom;
};
export function createListOffers(quantityElements) {
  const listElement = [];
  for (let i = 0; i < quantityElements; i++) {
    listElement[i] = createObject(i);
  }
  return listElement;
}
export const listOffers = createListOffers(QUANTITY_OFFERS);
