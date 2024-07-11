// Initialize variables
let currentScore = 0;
let highScore = 0; 
let difficulty = "easy";

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

// Function to generate a new puzzle
function generatePuzzle() {
  // Simplified puzzle generation (not guaranteed a solution)
  // Replace with a more robust algorithm later
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    numbers.push(Math.floor(Math.random() * 9) + 1); // Numbers 1-10
  }
  
  num1.textContent = numbers[0];
  num2.textContent = numbers[1];
  num3.textContent = numbers[2];
  num4.textContent = numbers[3];

  feedback.textContent = ""; // Clear previous feedback
  expressionInput.value = ""; // Clear input field
}

// Function to check the user's solution (simplified)
function checkSolution() {
  const userExpression = expressionInput.value;
  try {
    const result = eval(userExpression);
    if (result === 24) {
        console.log('correct')
      feedback.textContent = "Correct!";
      feedback.classList.remove("incorrect");
      feedback.classList.add("correct");
      currentScore++;
      currentScoreDisplay.textContent = currentScore;
      updateHighScore();
      generatePuzzle(); // Generate a new puzzle
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
    // You could store this in localStorage to make it persistent
  }
}

// Event listeners
submitButton.addEventListener("click", checkSolution);
document.getElementById("new-game").addEventListener("click", generatePuzzle);

// Initial puzzle generation on page load
generatePuzzle();
