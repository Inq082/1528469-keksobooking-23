//Получает данные
const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(onFail);
};

//Отправляет данные
const sendData = (onSuccess, onFail, data) => {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      } throw new Error('Ошибка отправки данных');
    }).catch(onFail);
};
export {getData, sendData};
