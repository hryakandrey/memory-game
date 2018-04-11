
// Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * Create a list that holds all of your cards
 */

const cards = [...document.getElementsByClassName('card')];
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');

let openedCards = [];

let matchCounter = 0;

let counter = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startNewGame(){
  shuffle(cards);

  for (const card of cards) {
    card.classList.remove('open', 'show', 'match', 'disable');
    deck.appendChild(card);
  }

  resetCounters();
}




function clickedCard(){
  if (! this.classList.contains('disable') && ! this.classList.contains('match')){
    this.classList.add('open', 'show', 'disable');
    check(this);
  }
}

function disable(){
  for (const card of cards) {
    card.classList.add('disable');
  }
}

function enable(){
  for (const card of cards) {
    card.classList.remove('disable');
  }
}



function check(card){
  openedCards.push(card);
  if (openedCards.length === 2) {
    disable();
    if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
      cardsMatch();
    } else {
      cardsUnmatch();
    }
  }
}

function cardsMatch(){
  openedCards[0].classList.add('match');
  openedCards[0].classList.remove('open', 'show');
  openedCards[1].classList.add('match');
  openedCards[1].classList.remove('open', 'show');
  openedCards = [];
  addMatch();
}

function cardsUnmatch(){
  setTimeout(function(){
    openedCards[0].classList.remove('open', 'show', 'disable');
    openedCards[1].classList.remove('open', 'show', 'disable');
    openedCards = [];
    addMove();
  }, 1000);
}


function addMatch(){
  matchCounter++;
  if (matchCounter == 8) {
    console.log('finish');
  } else {
    console.log('play more');
  }
  addMove();
}


function addMove(){
  counter++;
  moves.innerText = counter;
  enable();
}


function resetCounters(){
  matchCounter = 0;
  counter = 0;
  moves.innerText = counter;
}




window.onload = startNewGame();




for (const card of cards) {
  card.addEventListener('click', clickedCard);
}

restart.addEventListener('click', startNewGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
