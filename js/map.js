import {address} from './form.js';
import {activatePage} from './form.js';
import {listOffers} from './data.js';
import {getCardTemplate} from './card.js';

const DEFAULT_LAT = 35.6817;
const DEFAULT_LNG = 139.75388;
const DEFAULT_SCALE = 13;

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const currentCoordinates = evt.target.getLatLng();
  const currentCoordinatesLat = currentCoordinates.lat.toFixed(5);
  const currentCoordinatesLng = currentCoordinates.lng.toFixed(5);
  address.value = `${currentCoordinatesLat}, ${currentCoordinatesLng}`;
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

listOffers.forEach((item) => {
  const marker = L.marker(
    {
      lat: item.location.x,
      lng: item.location.y,
    },
    {
      icon: pinIcon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(
      getCardTemplate(item),
      {
        keepInView: true,
      },
    );
});
