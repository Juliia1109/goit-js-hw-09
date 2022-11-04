function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

function randomHexColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

btnStart.addEventListener('click', () => {
  timerId = setInterval(randomHexColor, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.disabled = false;
});
