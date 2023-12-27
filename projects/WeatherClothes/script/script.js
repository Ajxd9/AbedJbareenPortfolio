let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let isTwoPlayers = true; // Flag to determine if it's a 2-player game or against AI

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function checkTie() {
  return board.every((cell) => cell !== "");
}

function handleClick(index) {
  if (!gameActive || board[index] !== "") {
    return;
  }

  board[index] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    document.getElementById("status").textContent = `Player ${winner} wins!`;
    gameActive = false;
  } else if (checkTie()) {
    document.getElementById("status").textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (!isTwoPlayers && currentPlayer === "O") {
      setTimeout(makeAIMove, 500);
    } else {
      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function makeAIMove() {
  const emptyCells = board.reduce((acc, val, index) => {
    if (val === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const aiMove = emptyCells[randomIndex];

  board[aiMove] = "O";
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    document.getElementById("status").textContent = `Player ${winner} wins!`;
    gameActive = false;
  } else if (checkTie()) {
    document.getElementById("status").textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = "X";
    document.getElementById(
      "status"
    ).textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").textContent = isTwoPlayers
    ? "Player X's turn"
    : "Player X vs AI";
  renderBoard();
}

function renderBoard() {
  for (let i = 0; i < 9; i++) {
    document.getElementsByClassName("cell")[i].textContent = board[i];
  }
}

function togglePlayers() {
  isTwoPlayers = !isTwoPlayers;
  resetGame();
}

resetGame();
