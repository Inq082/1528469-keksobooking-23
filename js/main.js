/*import {createListOffers, listOffers} from './data.js';

createListOffers();
window.console.log(listOffers);*/
import {listOffers} from './data.js';
import  {getCardTemplate} from './card.js';

const adsList = listOffers;

const cardTemplate = getCardTemplate(adsList[0]);

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(cardTemplate);
mapCanvas.classList.remove('hidden');
window.console.log(cardTemplate);


