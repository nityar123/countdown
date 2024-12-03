const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const countdownDisplay = document.getElementById('countdown');
const alarmSound = document.getElementById('alarm-sound'); 
const circle = document.querySelector('.circle'); 

let countdownInterval;

function startCountdown() {
  let minutes = parseInt(minutesInput.value || '0', 10);
  let seconds = parseInt(secondsInput.value || '0', 10);

  // Validate seconds input
  if (seconds < 0 || seconds > 59) {
    alert('Please enter seconds between 0 and 59.');
    return;
  }

  let totalSeconds = minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    alert('Please enter a valid time.');
    return;
  }

  startBtn.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  circle.classList.add('bouncing'); // Start bouncing animation

  countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "Time's Up!";
      countdownDisplay.style.color = '#e63946';
      
      alarmSound.play();

      circle.classList.remove('bouncing'); // Stop bouncing animation
      return;
    }

    totalSeconds--;
    const displayMinutes = Math.floor(totalSeconds / 60);
    const displaySeconds = totalSeconds % 60;
    countdownDisplay.textContent = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  countdownDisplay.textContent = '00:00';
  countdownDisplay.style.color = '#f1faee';
  startBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  minutesInput.value = '';
  secondsInput.value = '';
  circle.classList.remove('bouncing'); // Stop bouncing animation
}

startBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetCountdown);
