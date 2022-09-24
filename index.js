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
      resetStateValues("displayValue");
      // calculatorState.displayValue = "0";
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
      calculatorState.displayValue = operate();
      display.innerText = calculatorState.displayValue;
    }
    calculatorState.operator = e.target.innerText;
    calculatorState.previousKeyType = "operator";
  }
  // This whole if statement could just be a function
  if (dataType === "calculate" && calculatorState.firstOperand) {
    setCalculateStateValue("displayValue", operate());
    resetStateValues("operator", "firstOperand");
    updateDisplayUI(calculatorState);
  }
  console.dir(calculatorState);
});

function setCalculateStateValue(property, value) {
  calculatorState[property] = value;
}

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

function updateDisplayUI({ displayValue }) {
  display.innerText = displayValue;
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

function operate() {
  const { displayValue, firstOperand, operator } = calculatorState;
  const operations = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2,
  };
  return operations[operator](+firstOperand, +displayValue);
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
