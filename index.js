const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const result = document.getElementById('result');
const gameContainer = document.querySelector('.game-container');
const controls = document.querySelector('.controls-container');
let cards;
let interval;
let firsCard = false;
let secondCard = false;

const items = [
  {name: 'image1', image: 'images/image1.png'},
  {name: 'image2', image: 'images/image2.png'},
  {name: 'image3', image: 'images/image3.png'},
  {name: 'image4', image: 'images/image4.png'},
  {name: 'image5', image: 'images/image5.png'},
  {name: 'image6', image: 'images/image6.png'},
  {name: 'image7', image: 'images/image7.png'},
  {name: 'image8', image: 'images/image8.png'},
  {name: 'image9', image: 'images/image9.png'},
  {name: 'image10', image: 'images/image10.png'},
  {name: 'image11', image: 'images/image11.png'},
  {name: 'image12', image: 'images/image12.png'},
  {name: 'image13', image: 'images/image13.png'},
  {name: 'image14', image: 'images/image14.png'},
  {name: 'image15', image: 'images/image15.png'},
  {name: 'image16', image: 'images/image16.png'},
  {name: 'image17', image: 'images/image17.png'}
];

// initial time
let seconds = 0;
let minutes = 0;

// initial moves and win count
let movesCount = 0;
let winCount = 0;

// timer
const timeGenerator = () => {
  seconds += 1;
  if(seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span> ${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
};

// random object from items Array
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = '';
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += 
    `<div class="card-container" data-card-value="${cardValues[i].name}">
      <div class="card-before">?</div>
      <div class="card-after"><img class="image" src="${cardValues[i].image}"/></div>
    </div>`;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  cards = document.querySelectorAll('.card-container');
  cards.forEach((card) => {
    card.addEventListener('click', function() {
      if(!card.classList.contains('matched')) {
        card.classList.add('flipped');
        if(!firsCard) {
          firsCard = card;
          firsCardValue = card.getAttribute('data-card-value');
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute('data-card-value');
          if(firsCardValue === secondCardValue) {
            firsCard.classList.add('matched');
            secondCard.classList.add('matched');
            firsCard = false;
            winCount += 1;
            if(winCount === Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Win</h2>
              <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firsCard, secondCard];
            firsCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove('flipped');
              tempSecond.classList.remove('flipped');
            }, 900);
          }
        }
      } 
    })
  })
};
 //start game
startButton.addEventListener('click', function() {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add('hide');
  stopButton.classList.remove('hide');
  startButton.classList.add('hide');
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  inizializer();
})

//stop game
stopButton.addEventListener('click', (stopGame = () => {
  controls.classList.remove('hide');
  stopButton.classList.add('hide');
  startButton.classList.remove('hide');
  clearInterval(interval);
}))

const inizializer = () => {
  result.innerHTML = '';
  winCount = 0;
  let cardValues = generateRandom();
  matrixGenerator(cardValues);
};
