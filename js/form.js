import {TITLE_LENGTH} from './data.js';
import { endParam } from './util.js';

const offerForm = document.querySelector('.ad-form');
const offerTitleInput = offerForm.querySelector('#title');
const offerType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const capacitySelect = offerForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const selectRooms = offerForm.querySelector('#room_number');
const checkinTime = offerForm.querySelector('#timein');
const checkoutTime = offerForm.querySelector('#timeout');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_MAX_PRICE = 1000000;

const DEFAULT_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

//Валидация заголовка
offerTitleInput.addEventListener('input', () => {
  const valueLength = offerTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Ещё ${(MIN_TITLE_LENGTH - valueLength)} ${endParam((MIN_TITLE_LENGTH - valueLength), TITLE_LENGTH)}`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Заголовок не должен превышать ${MAX_TITLE_LENGTH} ${endParam(MAX_TITLE_LENGTH, TITLE_LENGTH)}`);
  } else {
    offerTitleInput.setCustomValidity('');
  }

  offerTitleInput.reportValidity();
});

// Валидация цены
offerType.addEventListener('change', () => {
  offerPrice.placeholder = DEFAULT_MIN_PRICE[offerType.value];
  offerPrice.min = DEFAULT_MIN_PRICE[offerType.value];
});

offerPrice.addEventListener('input', () => {
  if (offerPrice.value > DEFAULT_MAX_PRICE) {
    offerPrice.setCustomValidity(`Цена не должна превышать ${DEFAULT_MAX_PRICE} руб.`);
  } else if (offerPrice.value < DEFAULT_MIN_PRICE[offerType.value]) {
    offerPrice.setCustomValidity(`Цена должна быть не менее ${DEFAULT_MIN_PRICE[offerType.value]} руб.`);
  } else {
    offerPrice.setCustomValidity('');
  }

  offerPrice.reportValidity();
});

// Валидация количества гостей и комнат
const validateRooms = () => {
  const roomValue = selectRooms.value;

  capacityOptions.forEach((option) => {
    const isDisabled = (numberOfGuests[roomValue].indexOf(option.value) === -1);

    option.selected = numberOfGuests[roomValue][0] === option.value;
    option.disabled = isDisabled;
    option.hidden = isDisabled;
  });
};
const onRoomNumberChange = () => {
  validateRooms();
} ;

// Синхронизация полей времени заезда и выезда
checkinTime.addEventListener('change', () => {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', () => {
  checkinTime.value = checkoutTime.value;
});

validateRooms();

selectRooms.addEventListener('change', onRoomNumberChange);

