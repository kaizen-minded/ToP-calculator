"strict use";
console.log("CONNECTED");
const calculatorState = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  previousKeyType: null,
};

const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator h2");
const clearBtn = document.querySelector("[data-type=clear]");

calculator.addEventListener("click", (e) => {
  const dataType = e.target.getAttribute("data-type");
  // debugger;
  if (dataType === "number") {
    if (calculatorState.previousKeyType === "operator") {
      calculatorState.firstOperand = calculatorState.displayValue;
      calculatorState.displayValue = "0";
    }
    updateDisplayValue(e.target.innerText);
    display.innerText = calculatorState.displayValue;
    calculatorState.previousKeyType = "number";
  }
  if (dataType === "operator") {
    if (
      calculatorState.previousKeyType === "number" &&
      calculatorState.firstOperand
    ) {
      // debugger;
      calculatorState.displayValue = operate(
        calculatorState.operator,
        calculatorState.firstOperand,
        calculatorState.displayValue
      );
      display.innerText = calculatorState.displayValue;
    }
    calculatorState.operator = e.target.innerText;
    calculatorState.previousKeyType = "operator";
  }
  if (dataType === "calculate") {
    if (calculatorState.displayValue && calculatorState.firstOperand) {
      calculatorState.displayValue = operate(
        calculatorState.operator,
        calculatorState.firstOperand,
        calculatorState.displayValue
      );
      calculatorState.operator = null;
      calculatorState.firstOperand = null;
      display.innerText = calculatorState.displayValue;
    }
  }
  console.dir(calculatorState);
});
clearBtn.addEventListener("click", () => {
  displayValue = "0";
  display.innerText = displayValue;
});

function operate(operator, num1, num2) {
  const operations = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2,
  };
  return operations[operator](+num1, +num2);
}

function updateDisplayValue(userValue) {
  const { displayValue } = calculatorState;
  if (displayValue === "0" || displayValue === null) {
    calculatorState.displayValue = userValue;
  } else {
    calculatorState.displayValue += userValue;
  }
  return displayValue;
}
