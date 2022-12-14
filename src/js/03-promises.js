import Notiflix from 'notiflix';
const formElement = document.querySelector('.form');

formElement.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(formElement.delay.value);
  let step = Number(formElement.step.value);
  let amount = Number(formElement.amount.value);

  for (let index = 1; index <= amount; index++) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.warning(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        }, delay);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  let promiseEl = { position, delay };
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(promiseEl);
    } else {
      reject(promiseEl);
    }
  });
}
