const MESSAGE_SHOW_TIME = 5000;

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
