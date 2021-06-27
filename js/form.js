const offerForm = document.querySelector('.ad-form');
const offerTitleInput = offerForm.querySelector('#title');
const offerType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const capacitySelect = offerForm.querySelector('#capacity');
const selectRooms = offerForm.querySelector('#room_number');
const offerTime = offerForm.querySelector('.ad-form__element--time');
const timeIn = offerTime.querySelector('#timein');
const timeOut = offerTime.querySelector('#timeout');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
//let MIN_PRICE = 1000;
const DEFAULT_MAX_PRICE = 1000000;

const DEFAULT_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

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

// Валидация количества гостей и комнат
const checkRoomNumberCapacityValidity = () => {
  const numberOfGuests = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0],
  };

  capacitySelect.setCustomValidity(numberOfGuests[selectRooms.value].includes(Number(capacitySelect.value)) ? '' : 'выберите валидное значение');
  capacitySelect.reportValidity();

};

// Валидация цены

const checkPriceValidity = () => {
  if (offerPrice.value > DEFAULT_MAX_PRICE) {
    offerPrice.setCustomValidity(`Цена не должна превышать ${DEFAULT_MAX_PRICE} руб.`);

  } else if (offerPrice.value < DEFAULT_MIN_PRICE[offerType.value]) {
    offerPrice.setCustomValidity(`Цена должна быть не менее ${DEFAULT_MIN_PRICE[offerType.value]} руб.`);

  } else {
    offerPrice.setCustomValidity('');
  }
  offerPrice.placeholder = DEFAULT_MIN_PRICE[offerType.value];
  offerPrice.reportValidity();
};

// Синхронизация полей времени заезда и выезда

const checkTimeValidity = (timeValue) => {timeIn.value = timeValue.target.value; timeOut.value = timeValue.target.value;};

export const checkValidity = () => {
  offerPrice.addEventListener('change', () =>
    checkPriceValidity(),
  );
  offerTitleInput.addEventListener('input', checkTitleValidity);
  selectRooms.addEventListener('input', () =>
    checkRoomNumberCapacityValidity(),
  );
  offerType.addEventListener('change', () =>
    checkPriceValidity(),
  );
  timeIn.addEventListener('change', checkTimeValidity);
  timeOut.addEventListener('change', checkTimeValidity);
  capacitySelect.addEventListener('change', () =>
    checkRoomNumberCapacityValidity(),
  );
};
