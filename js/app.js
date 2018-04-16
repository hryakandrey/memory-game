
// @description Shuffle function from http://stackoverflow.com/a/2450976
// @param {array}
// @returns {array}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


const cards = [...document.getElementsByClassName('card')];
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const stars = document.querySelector('.stars').children;
const overlay = document.querySelector('.overlay');
const replayButton = document.querySelector('.replayButton');
const finalscore = document.querySelector('.finalscore');
const starrating = document.querySelector('.starrating');
const result = document.querySelector('.result');
const graph = document.querySelector('.graph');
const time = document.querySelector('.time');
const finaltime = document.querySelector('.finaltime');

let openedCards = [];
let matchCounter = 0;
let counter = 0;
let starCounter = 3;
let finalTime;
let timerId;


// @description Shuffles cards and reset counters
function startNewGame(){
  shuffle(cards);

  for (const card of cards) {
    card.classList.remove('open', 'show', 'match', 'disable');
    deck.appendChild(card);
  }

  for (star of stars) {
    star.style.removeProperty('visibility');
  }

  matchCounter = 0;
  counter = 0;
  moves.innerText = counter;
  time.innerText = "0 min 0 sec";
  startTimer();
}


// @description Disallows gameplay on cards with 'disable' and 'match' classes
function clickedCard(){
  if (! this.classList.contains('disable') && ! this.classList.contains('match')){
    this.classList.add('open', 'show', 'disable');
    check(this);
  }
}


// @description Checks if two opened cards match
// @param {object} a clicked card to be checked for matching
function check(card){
  openedCards.push(card);
  if (openedCards.length === 2) {
    for (const card of cards) {
      card.classList.add('disable');
    }
    if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
      cardsMatch();
    } else {
      cardsUnmatch();
    }
  }
}


// @description Adds 'match' class to cards
function cardsMatch(){
  openedCards[0].classList.add('match');
  openedCards[0].classList.remove('open', 'show');
  openedCards[1].classList.add('match');
  openedCards[1].classList.remove('open', 'show');
  openedCards = [];
  addMatch();
}


// @description Removes classes from unmatched cards with delay
function cardsUnmatch(){
  setTimeout(function(){
    openedCards[0].classList.remove('open', 'show', 'disable');
    openedCards[1].classList.remove('open', 'show', 'disable');
    openedCards = [];
    addMove();
  }, 500);
}


// @description Calls for modal
function addMatch(){
  matchCounter++;
  if (matchCounter == 8) {
    clearInterval(timerId);
    finalTime = time.innerText;
    setTimeout(gameOver, 1000);
  } else {
    addMove();
  }
}


// @description Counts moves and hides stars, makes cards clickable
function addMove(){
  counter++;
  moves.innerText = counter;

  if (counter == 10){
    stars[2].style.visibility = 'hidden';
    starCounter--;
  } else if (counter == 20) {
    stars[1].style.visibility = 'hidden';
    starCounter--;
  }

  for (const card of cards) {
    card.classList.remove('disable');
  }
}


// @description Shows game over dialog
function gameOver(){
  finalscore.innerText = counter;
  starrating.innerText = starCounter;
  finaltime.innerText = time.innerText;

  if (counter >= 20) {
    result.innerText = 'Looser';
    graph.style.backgroundImage = 'url(img/looser.png)';
  }

  overlay.classList.add('show');
}


// @description Stops timer and starts new game
function reStart(){
  clearInterval(timerId);
  startNewGame();
}


// @description Closes game over dialog and starts new game
function rePlay(){
  overlay.classList.remove('show');
  startNewGame();
}


// @description Updates timer info with 1 second delay
function startTimer(){
  let timer = 0;
  timerId = setInterval(function(){
    timer++;
    time.innerText = `${Math.round(timer/60)} min ${timer%60} sec`;
  }, 1000);
}


// Adds event listeners to all cards
for (const card of cards) {
  card.addEventListener('click', clickedCard);
}

// Adds event listener to restart button
restart.addEventListener('click', reStart);

// Adds event listener to play again button
replayButton.addEventListener('click', rePlay);

// Starts a new game when the document is loaded
window.onload = startNewGame();
