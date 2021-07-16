import {address, offerForm, resetButton} from './form.js';
import {activatePage, messageSuccessTemplate, messageErrorTemplate} from './form.js';
import {getCardTemplate} from './card.js';
import {getData, sendData} from './api.js';
import {showMessageGetError} from './messages.js';
import {initFilterEventLoader} from './filter.js';
import {debounce} from './utils/debounce.js';
import {adFilter} from './filter.js';

const DEFAULT_COORDS = {
  lat: 35.68170,
  lng: 139.75388,
};
const DEFAULT_SCALE = 13;
const OFFERS_COUNT = 10;

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainMarker = L.marker(
  DEFAULT_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.on('moveend', (evt) => {
  const currentCoordinates = evt.target.getLatLng();
  const currentCoordinatesLat = currentCoordinates.lat.toFixed(5);
  const currentCoordinatesLng = currentCoordinates.lng.toFixed(5);
  address.value = `${currentCoordinatesLat}, ${currentCoordinatesLng}`;
});

export const addMarkers = (item) => {
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
      getCardTemplate(item),
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

const resetPage = () => {
  offerForm.reset();
  mainMarker.setLatLng(DEFAULT_COORDS);
  address.readOnly = true;
  address.value = `${DEFAULT_COORDS.lat}, ${DEFAULT_COORDS.lng}`;
};

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(() => {
    const successMessageElement = messageSuccessTemplate.cloneNode(true);
    document.body.append(successMessageElement);
    resetPage();},
  () => {
    const errorMessageElement = messageErrorTemplate.cloneNode(true);
    document.body.append(errorMessageElement);}, formData);
});

resetButton.addEventListener('click', () => {
  resetPage();
});

const initMarkers = (offers) => {
  offers.filter(adFilter).slice(0, OFFERS_COUNT).forEach((item) => {
    addMarkers(item);
  });
};

map.on('load', () => {
  activatePage();
  getData((data) => {
    initMarkers(data);
    initFilterEventLoader(debounce(() => {
      markerGroup.clearLayers();
      initMarkers(data);
    }));
  }, showMessageGetError);
  setTitleLayer();
  address.value = `${DEFAULT_COORDS.lat}, ${DEFAULT_COORDS.lng}`;
}).setView(DEFAULT_COORDS, DEFAULT_SCALE);


mainMarker.addTo(map);
