
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

let openedCards = [];
let matchCounter = 0;
let counter = 0;



// @description Shuffles cards and reset counters
function startNewGame(){
  shuffle(cards);
  for (const card of cards) {
    card.classList.remove('open', 'show', 'match', 'disable');
    deck.appendChild(card);
  }
  matchCounter = 0;
  counter = 0;
  moves.innerText = counter;
  for (star of stars) {
    star.style.removeProperty('visibility');
  }
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
  }, 1000);
}

// @description Calls for modal
function addMatch(){
  matchCounter++;
  if (matchCounter == 8) {
    console.log('finish');
  } else {
    console.log('play more');
  }
  addMove();
}

// @description Counts moves and hides stars
function addMove(){
  counter++;
  moves.innerText = counter;
  if (counter == 10){
    stars[2].style.visibility = 'hidden';
  } else if (counter == 20) {
    stars[1].style.visibility = 'hidden';
  } else if (counter == 30) {
    stars[0].style.visibility = 'hidden';
  }
  for (const card of cards) {
    card.classList.remove('disable');
  }
}



// Adds event listeners to all cards
for (const card of cards) {
  card.addEventListener('click', clickedCard);
}

// Adds event listener restart button
restart.addEventListener('click', startNewGame);

// Starts a new game when the document is loaded
window.onload = startNewGame();
