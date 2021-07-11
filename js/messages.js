import {isEscEvent} from './utils.js';

const MESSAGE_SHOW_TIME = 5000;

export const onMessageHide = (evt) => {
  const message = document.querySelector('.show-message');
  if (isEscEvent(evt) || evt.type === 'click') {
    evt.preventDefault();
    message.remove();
    document.removeEventListener('keydown', onMessageHide);
  }
};

export const showMessageGetError = () => {
  const body = document.querySelector('body');
  const messageContainer = document.querySelector('#error-load').content.querySelector('.error-load');
  const мessageText = messageContainer.querySelector('.error-load__message');
  messageContainer.style.zIndex = 100;
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = 0;
  messageContainer.style.top = 0;
  messageContainer.style.right = 0;
  messageContainer.style.backgroundColor = 'red';
  мessageText.style.textAlign = 'center';
  мessageText.style.fontSize = '20px';

  body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};

export const showMessageSendSuccess = () => {
  const body = document.querySelector('body');
  const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  const messageSuccess = messageSuccessTemplate.cloneNode(true);
  messageSuccess.classList.add('show-message');
  body.append(messageSuccess);

  document.addEventListener('click', onMessageHide);
  document.addEventListener('keydown', onMessageHide);
};

export const showMessageSendError = () => {
  const body = document.querySelector('body');
  const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
  const messageError = messageErrorTemplate.cloneNode(true);
  messageError.classList.add('show-message');

  body.append(messageError);

  const buttonCloseMessage = document.querySelector('.error__button');
  buttonCloseMessage.addEventListener('click', onMessageHide);
  document.addEventListener('click', onMessageHide);
  document.addEventListener('keydown', onMessageHide);
};
