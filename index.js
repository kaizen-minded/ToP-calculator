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
  const handleActions = {
    number: handleNumber,
    operator: handleOperator,
    calculate: handleCalculate,
    decimal: handleDecimal,
  };
  handleActions[dataType](e);
  console.dir(calculatorState);
});

function handleDecimal() {
  if (calculatorState.previousKeyType === "operator") {
    setCalculateStateValue("firstOperand", calculatorState.displayValue);
    resetStateValues("displayValue");
  }
  if (calculatorState.displayValue.includes(".")) return;
  calculatorState.displayValue += ".";
  updateDisplayUI();
  setCalculateStateValue("previousKeyType", "decimal");
}
function handleNumber(e) {
  if (calculatorState.previousKeyType === "operator") {
    setCalculateStateValue("firstOperand", calculatorState.displayValue);
    resetStateValues("displayValue");
  }
  updateDisplayValue(e.target.innerText);
  updateDisplayUI();
  setCalculateStateValue("previousKeyType", "number");
}

function handleOperator(e) {
  if (
    calculatorState.previousKeyType === "number" &&
    calculatorState.firstOperand
  ) {
    setCalculateStateValue("displayValue", operate());
    updateDisplayUI();
  }
  if (calculatorState.previousKeyType === "calculate") {
    setCalculateStateValue("displayValue", display.innerText);
  }
  setCalculateStateValue("operator", e.target.innerText);
  setCalculateStateValue("previousKeyType", "operator");
}

function handleCalculate() {
  if (calculatorState.firstOperand) {
    setCalculateStateValue("displayValue", operate());
    updateDisplayUI();
    resetStateValues("operator", "firstOperand", "displayValue");
    setCalculateStateValue("previousKeyType", "calculate");
  }
}

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

function updateDisplayUI() {
  display.innerText = calculatorState.displayValue;
}

clearBtn.addEventListener("click", () => {
  resetStateValues(
    "displayValue",
    "firstOperand",
    "operator",
    "previousKeyType"
  );
  updateDisplayUI();
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
