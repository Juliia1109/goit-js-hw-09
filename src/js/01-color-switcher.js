function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  bodyEl.style.backgroundColor = getRandomHexColor();
  btnStop.disabled = true;
  btnStart.disabled = false;
});
