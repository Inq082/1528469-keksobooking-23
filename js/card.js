import {OFFER_TYPE, OFFER_ROOM, OFFER_GUEST} from './data.js';
import {endParam, removeChildrens} from './utils.js';

//скрываем при отсутствии данных
const setCardElementText = (cardElement, className, text) => {
  const cardRow = cardElement.querySelector(className);
  if (!text || !text.length) {
    cardRow.classList.add('hidden');
  } else {
    cardRow.textContent = text;
  }
};

//создаем DOM объект
export const getCardTemplate = (adsItem) => {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const cardElement = cardTemplate.cloneNode(true);
  const rooms = endParam(adsItem.offer.rooms, OFFER_ROOM);
  const guests = endParam(adsItem.offer.guests, OFFER_GUEST);

  setCardElementText(cardElement, '.popup__title', adsItem.offer.title);
  setCardElementText(cardElement, '.popup__text--address', adsItem.offer.address);
  setCardElementText(cardElement, '.popup__text--price', `${adsItem.offer.price} ₽/ночь`);
  setCardElementText(cardElement, '.popup__type', OFFER_TYPE[adsItem.offer.type]);
  setCardElementText(cardElement, '.popup__text--capacity', `${adsItem.offer.rooms} ${rooms} для ${adsItem.offer.guests} ${guests}`);
  setCardElementText(cardElement, '.popup__text--time', `Заезд после ${adsItem.offer.checkin} , выезд до ${adsItem.offer.checkout}`);
  setCardElementText(cardElement, '.popup__description', adsItem.offer.description);
  const photosElements = adsItem.offer.photos;
  const photoContainer = cardElement.querySelector('.popup__photos');
  removeChildrens(photoContainer);
  if (photosElements) {
    photosElements.forEach((imageSource) => {
      const image = document.createElement('img');
      image.src = imageSource;
      image.classList.add('popup__photo');
      image.width = 45;
      image.height = 40;
      image.alt = 'Фотография жилья';
      photoContainer.appendChild(image);
    });

    const featureContainer = cardElement.querySelector('.popup__features');
    featureContainer.innerHTML = '';
    const features = adsItem.offer.features;
    if (features) {
      features.forEach((feature) => {
        const listItem = document.createElement('li');
        listItem.classList.add('.popup__features');
        listItem.classList.add(`popup__feature--${feature}`);
        featureContainer.appendChild(listItem);
      });
    }
  }
  cardElement.querySelector('.popup__avatar').src = adsItem.author.avatar;

  return cardElement;
};
