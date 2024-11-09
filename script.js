const gameBoard = document.getElementById("gameBoard");
const cells = Array.from(document.querySelectorAll(".cell"));
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let gameActive = true;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// دالة التحقق من الفوز
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === currentPlayer);
  });
}

// دالة التحقق من التعادل
function checkDraw() {
  return cells.every(cell => cell.textContent !== "");
}

// دالة إعادة التشغيل
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O"); // إزالة الكلاس X و O عند إعادة التشغيل
  });
  currentPlayer = "X";
  gameActive = true;
}

// دالة التعامل مع النقر على الخلية
function handleCellClick(event) {
  const cell = event.target;

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer); // إضافة كلاس X أو O حسب اللاعب الحالي

  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (checkDraw()) {
    alert("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// إضافة الأحداث للخلية وزر إعادة التشغيل
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", resetGame);
