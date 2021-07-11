//Получает данные
export const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch ((err) => {
      onError(err);
    });
};

//Отправляет данные
export const sendData = (body, onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
