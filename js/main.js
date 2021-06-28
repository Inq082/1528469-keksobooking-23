import {listOffers} from './data.js';
import  {getCardTemplate} from './card.js';
import {checkValidity, offerForm, offerFormFields, filtersForm, filtersFormFieldsets, deactivatePage, activatePage} from './form.js';

const cardTemplate = getCardTemplate(listOffers[0]);

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(cardTemplate);
window.console.log(cardTemplate);
window.console.log(listOffers);
checkValidity();

checkValidity();
deactivatePage(offerForm, offerFormFields);
activatePage(filtersForm, filtersFormFieldsets);
