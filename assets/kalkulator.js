const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
    } else if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
    } else if (target.classList.contains("equals")) {
      performCalculations();
      updateDisplay();
    } else if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
    } else {
      inputDigit(target.innerText);
      updateDisplay();
    }
  });
}

function inverseNumber() {
  if (calculator.displayNumber !== "0") {
    calculator.displayNumber = -parseFloat(calculator.displayNumber);
  }
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = parseFloat(calculator.displayNumber);
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}

function performCalculations() {
  if (calculator.firstNumber === null || calculator.operator === null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  const secondNumber = parseFloat(calculator.displayNumber);
  let result = 0;

  switch (calculator.operator) {
    case "+":
      result = calculator.firstNumber + secondNumber;
      break;
    case "-":
      result = calculator.firstNumber - secondNumber;
      break;
  }

  calculator.displayNumber = result;
  calculator.operator = null;
  calculator.waitingForSecondNumber = false;
}
