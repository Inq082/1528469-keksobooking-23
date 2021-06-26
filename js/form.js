const offerForm = document.querySelector('.ad-form');
const offerTitleInput = offerForm.querySelector('#title');
const offerType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const capacitySelect = offerForm.querySelector('#capacity');
const selectRooms = offerForm.querySelector('#room_number');
const offerTime = offerForm.querySelector('.ad-form__element--time');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
let MIN_PRICE = 1000;
const DEFAULT_MAX_PRICE = 1000000;

/*const DEFAULT_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

 */

//Валидация заголовка
const checkTitleValidity = () => {
  const valueLength = offerTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Ещё ${(MIN_TITLE_LENGTH - valueLength)} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity(`Удалите ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    offerTitleInput.setCustomValidity('');
  }

  offerTitleInput.reportValidity();
};

// Валидация цены

const checkPriceValidity = () => {
  if (offerPrice.value > DEFAULT_MAX_PRICE) {
    offerPrice.setCustomValidity(`Цена не должна превышать ${DEFAULT_MAX_PRICE} руб.`);

  } else if (offerPrice.value < MIN_PRICE) {
    offerPrice.setCustomValidity(`Цена должна быть не менее ${MIN_PRICE} руб.`);

  } else {
    offerPrice.setCustomValidity('');
  }

  offerPrice.reportValidity();

};

// Валидация количества гостей и комнат
const checkRoomNumberCapacityValidity = () => {
  const numberOfGuests = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  for (const option of capacitySelect.children) {
    const isIncludes = numberOfGuests[+selectRooms.value].includes(+option.value);
    option.disabled = !isIncludes;

    if (option.disabled === true) {
      option.removeAttribute('selected');
    }

    if (option.disabled === false && (+option.value === 1 || +option.value === 0)) {
      option.setAttribute('selected', '');
    }
  }
};

const checkTypeValidity = () => {
  switch (offerType.value) {
    case 'bungalow':
      MIN_PRICE = 0;
      break;
    case 'flat':
      MIN_PRICE = 1000;
      break;
    case 'hotel':
      MIN_PRICE = 3000;
      break;
    case 'house':
      MIN_PRICE = 5000;
      break;
    case 'palace':
      MIN_PRICE = 10000;
      break;
    default:
      MIN_PRICE = 1000;
  }

  offerPrice.placeholder = MIN_PRICE;
  const input = offerPrice;

  input.onfocus = function() {
    if(input.value !== MIN_PRICE) {
      input.value = '';
    }
  };

  input.onblur = function() {
    if(input.value !== '') {
      input.value = MIN_PRICE;
    }
  };
};

// Синхронизация полей времени заезда и выезда
const checkTimeValidity = (evt) => {
  const timeIn = offerTime.querySelector('#timein');
  const timeOut = offerTime.querySelector('#timeout');
  if (evt.target === timeIn) {
    timeOut.value = evt.target.value;
  } else if (evt.target === timeOut) {
    timeIn.value = evt.target.value;
  }
};

export const checkValidity = () => {
  offerPrice.addEventListener('input', checkPriceValidity);
  offerTitleInput.addEventListener('input', checkTitleValidity);
  selectRooms.addEventListener('change', checkRoomNumberCapacityValidity);
  offerType.addEventListener('change', checkTypeValidity);
  offerTime.addEventListener('change', checkTimeValidity);
};
