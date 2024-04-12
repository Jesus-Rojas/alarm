const button = document.querySelector('#button-start');
const audio = new Audio('./../assets/audio/cardinal.mp3');
audio.loop = false;
audio.volume = 0.05;

const runAlarm = () => {
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => (audio.pause()), 1500);
};

button.addEventListener('click', () => {
  button.disabled = true;
  const seconds = 60;
  const defaultMinutes = 60;
  let minutes = prompt('Ingrese el intervalo de minutos', defaultMinutes);
  minutes = isNaN(minutes) ? defaultMinutes : +minutes;
  minutes = minutes > 0 ? minutes : defaultMinutes;
  runAlarm();
  setInterval(runAlarm, ((1000 * seconds) * minutes));
});
