import {OFFER_TYPE, OFFER_ROOM, OFFER_GUEST} from './data.js';
import {endParam} from './utils.js';

//скрываем при отсутствии данных
const setCardElementText = (cardElement, className, text) => {
  const cardRow = cardElement.querySelector(className);
  if (!text || !text.length) {
    cardRow.classList.add('hidden');
  } else {
    cardRow.textContent = text;
  }
};
const setPhotosElement = (photoadsList, container) => {
  if (photoadsList.length > 0) {
    const photoTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup__photo');

    photoadsList.forEach((photoUrl) => {
      if (photoUrl.length > 0) {
        const photoElement = photoTemplate.cloneNode(true);
        photoElement.src = photoUrl;
        container.appendChild(photoElement);
      }
    });
  } else {
    container.classList.add('hidden');
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
  //setCardElementText(cardElement, '.popup__features', adsItem.offer.features.join(', '));
  // отрисовка features
  const genFeatures = function (newFeature) {
    const futureContainer = cardElement.querySelector('.popup__features');
    const feature = adsItem.offer.features;
    if (newFeature === 0) {
      futureContainer.classList.add('hidden');
    } else {
      futureContainer.innerHTML = '';
      if (adsItem.offer.features.length > 0) {
        const li = document.createElement('li');
        li.classList.add('popup__feature');
        li.classList.add(`popup__feature--${feature}`);
        futureContainer.appendChild(li);
      }
    }
    return futureContainer;
  };
  /*const futureContainer = cardElement.querySelector('.popup__features');
  if (adsItem.offer.features.length > 0) {
    futureContainer.innerHTML = '';
    for (const feature of adsItem.offer.features) {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(`popup__feature--${feature}`);
      futureContainer.appendChild(li);
    }
  }*/
  setCardElementText(cardElement, '.popup__description', adsItem.offer.description);

  const photosContainer = cardElement.querySelector('.popup__photos');

  setPhotosElement(adsItem.offer.photos, photosContainer);

  cardElement.querySelector('.popup__avatar').src = adsItem.author.avatar;

  return cardElement;
};
