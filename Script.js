let randomNumber;
let maxAttempts;
let attemptsLeft;
let level;
let history = [];

function setLevel() {
  level = document.getElementById("level").value;

  if (level === "easy") {
    randomNumber = generateRandom(10);
    maxAttempts = 5;
  } else if (level === "hard") {
    randomNumber = generateRandom(50);
    maxAttempts = 7;
  }

  attemptsLeft = maxAttempts;
  history = [];

  enableGame();
  updateAttempts();
  showMessage("Game Started 🎮", "white");
}

function generateRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

function checkGuess() {
  const input = document.getElementById("guessInput");
  const guess = Number(input.value);

  if (!isValidGuess(guess)) return;

  attemptsLeft--;
  history.push(guess);

  if (guess === randomNumber) {
    saveBestScore();
    showMessage("🎉 You Win!", "lightgreen");
    endGame();
  } else if (attemptsLeft === 0) {
    showMessage(`❌ Game Over! Number was ${randomNumber}`, "red");
    endGame();
  } else {
    showMessage(
      guess > randomNumber ? "📉 Too High" : "📈 Too Low",
      "orange"
    );
  }

  updateAttempts();
  input.value = "";
}

function isValidGuess(guess) {
  if (!guess) {
    alert("Enter a number");
    return false;
  }

  if (level === "easy" && (guess < 1 || guess > 10)) {
    alert("Easy level: 1–10 only");
    return false;
  }

  if (level === "hard" && (guess < 1 || guess > 50)) {
    alert("Hard level: 1–50 only");
    return false;
  }

  return true;
}

function updateAttempts() {
  document.getElementById("attempts").innerText =
    `Attempts Left: ${attemptsLeft} | History: ${history.join(", ")}`;
}

function showMessage(text, color) {
  const msg = document.getElementById("message");
  msg.innerText = text;
  msg.style.color = color;
}

function saveBestScore() {
  let best = localStorage.getItem(`best-${level}`);

  if (!best || attemptsLeft > best) {
    localStorage.setItem(`best-${level}`, attemptsLeft);
  }
}

function enableGame() {
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessBtn").disabled = false;
}

function endGame() {
  document.getElementById("guessInput").disabled = true;
  document.getElementById("guessBtn").disabled = true;
}

function resetGame() {
  location.reload();
}
