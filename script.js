// Initialize variables
let currentScore = 0;
let highScore = 0; 
let difficulty = "easy";
let timerInterval;

// Get references to DOM elements
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const expressionInput = document.getElementById("expression");
const submitButton = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const currentScoreDisplay = document.getElementById("current-score");
const highScoreDisplay = document.getElementById("high-score");
const timeLeftDisplay = document.getElementById("time-left");

// Function to generate a new puzzle
function generatePuzzle() {
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    numbers.push(Math.floor(Math.random() * 9) + 1);
  }
  
  num1.textContent = numbers[0];
  num2.textContent = numbers[1];
  num3.textContent = numbers[2];
  num4.textContent = numbers[3];

  feedback.textContent = ""; 
  expressionInput.value = ""; 
}

// Function to check the user's solution (simplified)
function checkSolution() {
  const userExpression = expressionInput.value;
  try {
    const result = eval(userExpression);
    if (result === 24) {
      feedback.textContent = "Correct!";
      feedback.classList.remove("incorrect");
      feedback.classList.add("correct");
      currentScore++;
      currentScoreDisplay.textContent = currentScore;
      updateHighScore();
      generatePuzzle();
    } else {
      feedback.textContent = "Incorrect. Try again!";
      feedback.classList.remove("correct");
      feedback.classList.add("incorrect");
    }
  } catch (error) {
    feedback.textContent = "Invalid expression!";
    feedback.classList.remove("correct");
    feedback.classList.add("incorrect");
  }
}

function updateHighScore() {
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreDisplay.textContent = highScore;
  }
}

// Function to start the game
function startGame() {
  generatePuzzle();
  startTimer();
}

// Function to start the timer
function startTimer() {
  let timeLeft = 120;
  timeLeftDisplay.textContent = timeLeft;
  
  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      currentScore--;
      currentScoreDisplay.textContent = currentScore;
      alert("Time's up! 1 point deducted.");
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Event listeners
submitButton.addEventListener("click", checkSolution);
document.getElementById("new-game").addEventListener("click", generatePuzzle);
document.getElementById("start-game").addEventListener("click", startGame);

// Initial puzzle generation on page load
generatePuzzle();
