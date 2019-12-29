const cards = document.querySelectorAll('.Grid-item');
const button = document.querySelector('.restart');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;
let openCards = 0;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    counter++;
    count.innerText = "Attempts: " + counter;
    return;
  }

  secondCard = this;
  counter++;
  count.innerText = "Attempts: " + counter;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.info === secondCard.dataset.info;
  isMatch ? (disableCards(), restart()) : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1300);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  cards.forEach(card => card.classList.remove("flip"));
  openCards = 0;
  counter = 0;
  count.innerText = "Attempts: " + counter;
  cards.forEach(card => card.addEventListener('click', flipCard));
  button.style.display = 'none';
  
}

function restart() {
  openCards++;
  if (openCards === 6) {
    button.style.display = 'block';
    button.addEventListener('click', resetGame);

  }
}


(function shuffle() {
  cards.forEach(card => {
    let randomCards = Math.floor(Math.random() * 12);
    card.style.order = randomCards;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));