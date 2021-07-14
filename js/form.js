const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_MAX_PRICE = 1000000;
const MAX_CAPACITY = '100';

export const offerForm = document.querySelector('.ad-form');
const offerTitleInput = offerForm.querySelector('#title');
const offerType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const capacitySelect = offerForm.querySelector('#capacity');
const selectRooms = offerForm.querySelector('#room_number');
const offerTime = offerForm.querySelector('.ad-form__element--time');
const timeIn = offerTime.querySelector('#timein');
const timeOut = offerTime.querySelector('#timeout');
const filtersForm = document.querySelector('.map__filters');
export const address = document.querySelector('#address');
const filterFormsElements = Array.from(filtersForm.children).concat(Array.from(offerForm.children));
export const resetButton = document.querySelector('.ad-form__reset');
export const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
export const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const DefaultMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

//Деактивация формы
const deactivatePage = () => {
  filtersForm.classList.add('map__filters--disabled');
  offerForm.classList.add('ad-form--disabled');
  filterFormsElements.forEach((item) => {
    item.disabled = true;
  });
};

//Активация формы
export const activatePage = () => {
  filtersForm.classList.remove('map__filters--disabled');
  offerForm.classList.remove('ad-form--disabled');
  filterFormsElements.forEach((item) => {
    item.disabled = false;
  });
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
const validateRoomCapacity = (value) => {
  if (value === MAX_CAPACITY && capacitySelect.value !== '0') {
    capacitySelect.setCustomValidity('100 комнат может быть только "не для гостей"');
  } else if (value !== MAX_CAPACITY && capacitySelect.value === '0') {
    capacitySelect.setCustomValidity('Выберите количество гостей, оно не может равняться 0');
  } else if (value < capacitySelect.value) {
    capacitySelect.setCustomValidity(`Количество гостей должно быть не больше ${value}`);
  } else {
    capacitySelect.setCustomValidity('');
  }
  capacitySelect.reportValidity();
};

// Валидация цены
const checkPriceValidity = () => {
  if (offerPrice.value > DEFAULT_MAX_PRICE) {
    offerPrice.setCustomValidity(`Цена не должна превышать ${DEFAULT_MAX_PRICE} руб.`);

  } else if (offerPrice.value < DefaultMinPrice[offerType.value]) {
    offerPrice.setCustomValidity(`Цена должна быть не менее ${DefaultMinPrice[offerType.value]} руб.`);

  } else {
    offerPrice.setCustomValidity('');
  }
  offerPrice.placeholder = DefaultMinPrice[offerType.value];
  offerPrice.reportValidity();
};

// Синхронизация полей времени заезда и выезда
const checkTimeValidity = (firstTime, secondTime) => {
  secondTime.value = firstTime.value;
};

export const checkValidity = () => {
  offerPrice.addEventListener('change', () =>
    checkPriceValidity(),
  );
  offerTitleInput.addEventListener('input', checkTitleValidity);
  selectRooms.addEventListener('input', () =>
    validateRoomCapacity(selectRooms.value),
  );
  offerType.addEventListener('change', () =>
    checkPriceValidity(),
  );
  timeIn.addEventListener('change', () =>
    checkTimeValidity(timeIn, timeOut),
  );
  timeOut.addEventListener('change', () =>
    checkTimeValidity(timeOut, timeIn),
  );
  capacitySelect.addEventListener('input', () =>
    validateRoomCapacity(selectRooms.value),
  );
};
const removeMessage = () => {
  document.querySelectorAll('.success, .error').forEach((messageElement) => messageElement.remove());
};
document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    removeMessage();
  }
});

document.addEventListener('click', removeMessage);

deactivatePage();
checkValidity();

