const button = document.querySelector('#button-start');
const audio = new Audio('./../assets/audio/beep.mp3');

button.addEventListener('click', () => {
  button.disabled = true;
  audio.loop = false;
  audio.volume = 0.05;
  const initAlarm = () => {
    audio.play();
    setTimeout(() => (audio.pause()), 1000);
  };

  setInterval(initAlarm, ((1000 * 3)));
});