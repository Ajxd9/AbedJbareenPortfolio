const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
let currentPlayer = "player";
let board = [];
let gameActive = false;

function createBoard() {
  for (let row = 0; row < 6; row++) {
    board[row] = [];
    for (let col = 0; col < 7; col++) {
      board[row][col] = null;
    }
  }
}

function renderBoard() {
  boardElement.innerHTML = "";
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      boardElement.appendChild(cell);

      if (board[row][col] === "player") {
        cell.classList.add("player");
      } else if (board[row][col] === "ai") {
        cell.classList.add("ai");
      }
    }
  }
}

function startGame() {
  createBoard();
  renderBoard();
  messageElement.textContent = "";
  currentPlayer = "player";
  gameActive = true;
}

function handleCellClick(event) {
  if (!gameActive) return;

  const col = parseInt(event.target.dataset.col);
  const row = dropToken(col);

  if (row !== -1) {
    board[row][col] = currentPlayer;

    if (checkWin(row, col, currentPlayer)) {
      endGame(`${currentPlayer.toUpperCase()} wins!`);
      return;
    }

    if (checkDraw()) {
      endGame("It's a draw!");
      return;
    }

    currentPlayer = currentPlayer === "player" ? "ai" : "player";
    if (currentPlayer === "ai") {
      setTimeout(() => {
        makeAiMove();
      }, 500);
    }
  }

  renderBoard();

  const selectedCell = document.querySelector(
    `.cell[data-row="${row}"][data-col="${col}"]`
  );
  selectedCell.className = "selected";
}

function dropToken(col) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return -1;
}

function makeAiMove() {
  const col = aiMove();
  const row = dropToken(col);
  board[row][col] = "ai";

  if (checkWin(row, col, "ai")) {
    endGame("AI wins!");
  } else if (checkDraw()) {
    endGame("It's a draw!");
  } else {
    currentPlayer = "player";
    renderBoard();
  }
}

function endGame(message) {
  gameActive = false;
  messageElement.textContent = message;
}

function checkWin(row, col, player) {
  return (
    checkDirection(row, col, player, 1, 0) ||
    checkDirection(row, col, player, 0, 1) ||
    checkDirection(row, col, player, 1, 1) ||
    checkDirection(row, col, player, 1, -1)
  );
}

function checkDirection(row, col, player, rowDir, colDir) {
  let count = 1;
  count += countInDirection(row, col, player, rowDir, colDir);
  count += countInDirection(row, col, player, -rowDir, -colDir);
  return count >= 4;
}

function countInDirection(row, col, player, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;
  while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

function checkDraw() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
}

function aiMove() {
  // For simplicity, this AI will make a random move
  return Math.floor(Math.random() * 7);
}

startGame(); // Start the game when the page loads
