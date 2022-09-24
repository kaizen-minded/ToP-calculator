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
  // This whole if statement could just be a function
  if (dataType === "calculate") {
    // Is there ever a time when calculatorState.displayValue is not true?
    // If it is always true just delete this
    if (calculatorState.displayValue && calculatorState.firstOperand) {
      // Running the operate function then storing the value in calculatorState.displayValue
      // Looks like I can use deconstruction here
      calculatorState.displayValue = operate(
        calculatorState.operator,
        calculatorState.firstOperand,
        calculatorState.displayValue
      );
      // I'm turning the values back to their original settings
      // Maybe I can do a function that takes unknown amount of arguements

      // calculatorState.operator = null;
      // calculatorState.firstOperand = null;
      resetStateValues("operator", "firstOperand");
      // updateDisplayUI needs to be its own function
      display.innerText = calculatorState.displayValue;
    }
  }
  console.dir(calculatorState);
});

function resetStateValues(...args) {
  const originalState = {
    displayValue: "0",
    firstOperand: null,
    operator: null,
    previousKeyType: null,
  };
  args.forEach((value) => {
    calculatorState[value] = originalState[value];
  });
}

clearBtn.addEventListener("click", () => {
  resetStateValues(
    "displayValue",
    "firstOperand",
    "operator",
    "previousKeyType"
  );
  display.innerText = calculatorState.displayValue;
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
