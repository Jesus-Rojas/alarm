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

  const oneSecond = 1000;
  const seconds = 60;
  const minutes = 60;
  const timer = ((oneSecond * seconds) * minutes);
  setInterval(initAlarm, timer);
});