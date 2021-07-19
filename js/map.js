import {offerForm, toggleState, avatarPreview, photoContainer} from './form.js';
import {createCard} from './card.js';
import {getData} from './api.js';
import {initFilterEventLoader} from './filter.js';
import {filterOffers} from './filter.js';
import {debounce} from './utils.js';

const DEFAULT_COORDS = {
  lat: 35.68170,
  lng: 139.75388,
};
const DEFAULT_SCALE = 13;
const OFFERS_COUNT = 10;
const MESSAGE_SHOW_TIME = 5000;

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const mainMarker = L.marker(
  DEFAULT_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addMarkers = (item) => {
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: item.location.lat,
      lng: item.location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(
      createCard(item),
      {
        keepInView: true,
      },
    );
};
const setTitleLayer = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};
const showMessageGetError = () => {
  const body = document.querySelector('body');
  const messageContainer = document.querySelector('#error-load').content.querySelector('.error-load');
  body.append(messageContainer);
  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};
const resetPage = () => {
  offerForm.reset();
  mainMarker.setLatLng(DEFAULT_COORDS);
  address.readOnly = true;
  address.value = `${DEFAULT_COORDS.lat}, ${DEFAULT_COORDS.lng}`;
  avatarPreview.querySelector('img').src = 'img/muffin-grey.svg';
  if (photoContainer.querySelector('img')) {photoContainer.querySelector('img').remove();}
};

const initMarkers = (offers) => {
  offers.filter(filterOffers).slice(0, OFFERS_COUNT).forEach((item) => {
    addMarkers(item);
  });
};
const onMapLoad = () => {
  getData((data) => {
    initMarkers(data);
    toggleState();
    initFilterEventLoader(debounce(() => {
      markerGroup.clearLayers();
      initMarkers(data);
    }));
  }, showMessageGetError);
  setTitleLayer();
  address.value = `${DEFAULT_COORDS.lat}, ${DEFAULT_COORDS.lng}`;

};
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const currentCoordinates = evt.target.getLatLng();
  const currentCoordinatesLat = currentCoordinates.lat.toFixed(5);
  const currentCoordinatesLng = currentCoordinates.lng.toFixed(5);
  address.value = `${currentCoordinatesLat}, ${currentCoordinatesLng}`;
});

map.on('load', onMapLoad).setView(DEFAULT_COORDS, DEFAULT_SCALE);
resetButton.addEventListener('click', () => {
  resetPage();
});
export {addMarkers, resetPage};
