// Get the result display element
const resultDisplay = document.getElementById("result");

// Function to append characters to the display
function appendToDisplay(value) {
  if (resultDisplay.innerText === "0" && value !== ".") {
    resultDisplay.innerText = value;
  } else {
    // Check for consecutive operators
    const lastChar = resultDisplay.innerText.slice(-1);
    if (
      ["+", "-", "*", "/"].includes(lastChar) &&
      ["+", "-", "*", "/"].includes(value)
    ) {
      // Replace the last operator with the new one
      resultDisplay.innerText = resultDisplay.innerText.slice(0, -1) + value;
    } else {
      resultDisplay.innerText += value;
    }
  }
}

// Function to clear the display
function clearDisplay() {
  resultDisplay.innerText = "0";
}

// Function to delete the last character
function deleteLastChar() {
  if (resultDisplay.innerText.length === 1) {
    resultDisplay.innerText = "0";
  } else {
    resultDisplay.innerText = resultDisplay.innerText.slice(0, -1);
  }
}

// Function to calculate the result
function calculateResult() {
  try {
    // Using Function constructor instead of eval for security
    const result = Function(
      '"use strict"; return (' + resultDisplay.innerText + ")"
    )();

    // Handle division by zero
    if (!isFinite(result)) {
      resultDisplay.innerText = "Error";
    } else {
      // Format the result to avoid very long decimals
      resultDisplay.innerText = Number(result.toFixed(8)).toString();
    }
  } catch (error) {
    resultDisplay.innerText = "Error";
  }
}

// Add keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    appendToDisplay(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendToDisplay(key);
  } else if (key === ".") {
    appendToDisplay(".");
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Backspace") {
    deleteLastChar();
  }
});
