const board = document.getElementById('board');
const resetBtn = document.getElementById('reset-btn');
let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
cardValues = [...cardValues, ...cardValues]; 
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const shuffledValues = shuffle(cardValues);
  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerText = '?';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2) return; 
  if (flippedCards.includes(this)) return; 

  this.classList.add('flipped');
  this.innerText = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    flippedCards.forEach(card => card.classList.add('matched'));
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === cardValues.length) {
      setTimeout(() => alert('You win!'), 500);
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.innerText = '?';
      });
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  board.innerHTML = '';
  flippedCards = [];
  matchedCards = 0;
  createBoard();
}

resetBtn.addEventListener('click', resetGame);

createBoard(); 