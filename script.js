const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Handle cell clicks
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());

  checkForWinner();
}

// Check for a winner or a draw
function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] === "" ||
      gameState[b] === "" ||
      gameState[c] === ""
    ) {
      continue;
    }
    if (
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      roundWon = true;
      highlightWinningCells([a, b, c]);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Highlight winning cells
function highlightWinningCells(cells) {
  cells.forEach((index) => {
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.classList.add("winning-cell");
  });
}

// Reset the game
function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  initializeBoard();
}

// Event listener for reset button
resetButton.addEventListener("click", resetGame);

// Initialize the game on page load
initializeBoard();