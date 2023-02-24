const gameContainer = document.querySelector('.game__container');
const btn = document.querySelector('.game__btn');
const timer = 5000;
let counter = 1;
const score = document.createElement('span');
const spanTime = document.createElement('span');

score.classList.add('game__score');
spanTime.classList.add('game__timer');

score.textContent = counter

const start = () => {
  const startTime = Date.now();

  btn.removeEventListener('click', start);

  btn.addEventListener('click', () => {
    counter++;
    score.textContent = counter;
  });

  gameContainer.insertBefore(score, btn.nextSibling);
  gameContainer.insertBefore(spanTime, btn);

  const interval = setInterval(() => {
    const delta = Math.floor((timer - (Date.now() - startTime)) / 1000);
    const milliseconds = Math.floor((timer - (Date.now() - startTime)) % 1000 / 10);
    spanTime.textContent = `${delta.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }, 100);
  

  const timeout = setTimeout(() => {
    btn.disabled = true;

    const gameAlert = document.createElement('span');
    gameAlert.classList.add('game__alert');
    gameAlert.textContent = 'Игра окончена';
    score.textContent = `Вы успели сделать - ${counter} ${declOfNum(counter, ['клик', 'клика', 'кликов'])}`
    gameContainer.insertBefore(gameAlert, btn);

    spanTime.remove();

    clearTimeout(timeout);
    clearInterval(interval);
  }, timer);
};

function declOfNum(number, titles) {  
    let cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}

btn.addEventListener('click', start);
