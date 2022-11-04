import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const pickerElement = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let timer = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < new Date()) {
      btnStart.disabled = true;
      Notiflix.Report.warning('Please choose a date in the future');
      return;
    } else {
      btnStart.disabled = false;
    }

    btnStart.addEventListener('click', () => {
      timer = setInterval(() => {
        const now = new Date();
        const diff = selectedDates - now;
        const total = convertMs(diff);
        finalTime(total);
      }, 1000);
    });

    function finalTime({ days, hours, minutes, seconds }) {
      dataDays.textContent = `${days}`;
      dataHours.textContent = `${hours}`;
      dataMinutes.textContent = `${minutes}`;
      dataSeconds.textContent = `${seconds}`;
    }
  },
};

function addLeadingZero(value) {
  return `${value}`.padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

flatpickr(pickerElement, options);
