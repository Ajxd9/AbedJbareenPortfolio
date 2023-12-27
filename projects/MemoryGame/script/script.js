const apiUrl = "https://dog.ceo/api/breeds/image/random";
const cards = [];
let selectedCards = [];
let score = 0;

// Fetch dog images from the API
async function fetchDogImages() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching dog images:", error);
  }
}

// Initialize the game
async function initGame() {
  const gameBoard = document.getElementById("game-board");
  const scoreElement = document.getElementById("score");
  const winMessage = document.getElementById("win-message");

  for (let i = 0; i < 8; i++) {
    const image = await fetchDogImages();
    cards.push({ image, matched: false });
    cards.push({ image, matched: false });
  }

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  // Create card elements on the board
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;
    cardElement.addEventListener("click", handleCardClick);

    const imageElement = document.createElement("img");
    imageElement.src = "placeholder.jpg"; // Add a placeholder image
    imageElement.alt = "🐶";
    cardElement.appendChild(imageElement);

    gameBoard.appendChild(cardElement);
  });

  // Display the score
  scoreElement.textContent = `Score: ${score}`;
}

// Handle card click event
function handleCardClick(event) {
  const selectedCard = event.target;
  const index = selectedCard.dataset.index;

  if (!cards[index].matched && selectedCards.length < 2) {
    const imageElement = selectedCard.querySelector("img");
    imageElement.src = cards[index].image;
    selectedCards.push({ index, element: selectedCard });

    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

// Check if two selected cards are a match
function checkMatch() {
  const [card1, card2] = selectedCards;
  const index1 = card1.index;
  const index2 = card2.index;

  if (cards[index1].image === cards[index2].image) {
    cards[index1].matched = true;
    cards[index2].matched = true;
    card1.element.removeEventListener("click", handleCardClick);
    card2.element.removeEventListener("click", handleCardClick);
    score += 10;
  } else {
    const imageElements = selectedCards.map((card) =>
      card.element.querySelector("img")
    );
    imageElements.forEach((img) => (img.src = "placeholder.jpg"));
    score -= 1;
  }

  // Clear the selected cards array
  selectedCards = [];

  // Update the score
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Score: ${score}`;

  // Check if the game is won
  if (cards.every((card) => card.matched)) {
    showWinMessage();
  }
}

// Show win message
function showWinMessage() {
  const winMessage = document.getElementById("win-message");
  winMessage.style.display = "block";
}

// Reset the game
function resetGame() {
  const gameBoard = document.getElementById("game-board");
  const winMessage = document.getElementById("win-message");
  const scoreElement = document.getElementById("score");

  // Reset variables
  cards.length = 0;
  selectedCards = [];
  score = 0;

  // Clear the game board
  gameBoard.innerHTML = "";

  // Hide win message
  winMessage.style.display = "none";

  // Initialize the game
  initGame();
}

// Initialize the game when the DOM is ready
document.addEventListener("DOMContentLoaded", initGame);
