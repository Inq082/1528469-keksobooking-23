import {address} from './form.js';
import {activatePage} from './form.js';
//import {listOffers} from './data.js';
import {getCardTemplate} from './card.js';
import {getData} from './api.js';
import {showMessageGetError} from './messages.js';

let map = null;
const DEFAULT_LAT = 35.6817;
const DEFAULT_LNG = 139.75388;
const DEFAULT_SCALE = 13;
const OFFERS_COUNT = 10;

const addMainMarker = () => {
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
};

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
    .addTo(map)
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
const initMarkers = (offers) => {
  offers.slice(0, OFFERS_COUNT).forEach((item) => {
    addMarkers(item);
  });
};

map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    addMainMarker();
    getData((data) => {
      initMarkers(data);
    }, showMessageGetError);
    //addMarkers();
    setTitleLayer();
    address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
  });
map.setView({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
}, DEFAULT_SCALE);
