import {getRussianDeclension} from './utils.js';

const ROOMS = ['комната', 'комнаты', 'комнат'];
const GUESTS = ['гостя', 'гостей', 'гостей'];

const OfferType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const setCardElementText = (card, className, text) => {
  const cardRow = card.querySelector(className);
  if (!text || !text.length) {
    cardRow.classList.add('hidden');
  } else {
    cardRow.textContent = text;
  }
};
const createImages = (container, imageSources) => {
  container.innerHTML = '';
  if (imageSources) {
    imageSources.forEach((imageSource) => {
      const image = document.createElement('img');
      image.src = imageSource;
      image.classList.add('popup__photo');
      image.width = '45';
      image.height = '40';
      image.alt = 'Фотография жилья';
      container.appendChild(image);
    });
  }
};

const createFeatures = (container, listElement) => {
  container.innerHTML = '';
  if (listElement) {
    listElement.forEach((feature) => {
      const listItem = document.createElement('li');
      listItem.classList.add('popup__feature', `popup__feature--${feature}`);
      listItem.textContent = feature;
      container.appendChild(listItem);
    });
  }
};

const createCard = (adsItem) => {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const card = cardTemplate.cloneNode(true);
  const rooms = getRussianDeclension(adsItem.offer.rooms, ROOMS);
  const guests = getRussianDeclension(adsItem.offer.guests, GUESTS);

  setCardElementText(card, '.popup__title', adsItem.offer.title);
  setCardElementText(card, '.popup__text--address', adsItem.offer.address);
  setCardElementText(card, '.popup__text--price', `${adsItem.offer.price} ₽/ночь`);
  setCardElementText(card, '.popup__type', OfferType[adsItem.offer.type]);
  setCardElementText(card, '.popup__text--capacity', `${adsItem.offer.rooms} ${rooms} для ${adsItem.offer.guests} ${guests}`);
  setCardElementText(card, '.popup__text--time', `Заезд после ${adsItem.offer.checkin} , выезд до ${adsItem.offer.checkout}`);
  setCardElementText(card, '.popup__description', adsItem.offer.description);
  createFeatures(card.querySelector('.popup__features'), adsItem.offer.features);
  createImages(card.querySelector('.popup__photos'), adsItem.offer.photos);
  card.querySelector('.popup__avatar').src = adsItem.author.avatar;

  return card;
};
export {createCard};
