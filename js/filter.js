const housingTypeFilter = document.querySelector('#housing-type');
const housingPriceFilter = document.querySelector('#housing-price');
const housingRoomsFilter = document.querySelector('#housing-rooms');
const housingGuestsFilter = document.querySelector('#housing-guests');
const mapFilterForm = document.querySelector('.map__filters');

const PricasMap = {
  'middle': (value) => value >= 10000  && value <= 50000,
  'low': (value) =>  value < 10000,
  'high': (value) => value > 50000,
};

const filterOffers = ({offer}) => {
  const housingCondition = (housingTypeFilter.value === 'any') || (offer.type === housingTypeFilter.value);
  const pricesCondition = (housingPriceFilter.value === 'any') || (PricasMap[housingPriceFilter.value](offer.price));
  const roomsCondition = (housingRoomsFilter.value === 'any') || (offer.rooms === parseInt(housingRoomsFilter.value, 10));
  const guestsCondition = (housingGuestsFilter.value === 'any') || (offer.guests === parseInt(housingGuestsFilter.value, 10));
  const checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures && !offer.features) {
    return false;
  }
  for (const item of checkedFeatures) {
    if (!offer.features.includes(item.value)) {
      return false;
    }
  }
  return housingCondition && pricesCondition && roomsCondition && guestsCondition;
};

const initFilterEventLoader = (handler) => {
  mapFilterForm.addEventListener('change', handler);
};
export {filterOffers, initFilterEventLoader};
