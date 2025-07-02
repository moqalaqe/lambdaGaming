const decreaseBtn = document.getElementById('decreaseBtn') as HTMLButtonElement;
const increaseBtn = document.getElementById('increaseBtn') as HTMLButtonElement;
const betValue = document.getElementById('betValue') as HTMLParagraphElement;

increaseBtn.style.pointerEvents = "inherit";
decreaseBtn.style.pointerEvents = "inherit";

const MIN = 10;
const MAX = 50;
const STEP = 10;

function updateButtons(value: number): void {
  decreaseBtn.disabled = value <= MIN;
  decreaseBtn.style.opacity = value <= MIN ? '0.4' : '1';

  increaseBtn.disabled = value >= MAX;
  increaseBtn.style.opacity = value >= MAX ? '0.4' : '1';
}

function getCurrentValue(): number {
  return parseInt(betValue.textContent || `${MIN}`, 10);
}

decreaseBtn.addEventListener('click', () => {
  let value = getCurrentValue();
  if (value > MIN) {
    value -= STEP;
    betValue.textContent = value.toString();
    updateButtons(value);
  }
});

increaseBtn.addEventListener('click', () => {
  let value = getCurrentValue();
  if (value < MAX) {
    value += STEP;
    betValue.textContent = value.toString();
    updateButtons(value);
  }
});

updateButtons(getCurrentValue());
