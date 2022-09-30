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
    clear: handleClear,
    backspace: handleBackspace,
  };
  handleActions[dataType](e); //For the testing of handleTest
  // console.dir(calculatorState);
  // console.log(e.key);
  // handleTest(e);
});
document.addEventListener("keydown", (e) => {
  if (Number.isInteger(parseFloat(e.key.trim()))) {
    handleNumber(e);
  }
  if (["+", "-", "*", "/"].includes(e.key)) {
    handleOperator(e);
  }
  if (e.key === "Enter") {
    handleCalculate();
  }
  if (e.key === ".") {
    handleDecimal();
  }
  if (e.key.toLowerCase() === "c") {
    handleClear();
  }
  if (e.key === "Backspace") {
    handleBackspace();
  }
});

function handleBackspace() {
  const { displayValue } = calculatorState;
  if (displayValue.length === 1 || displayValue === "0") {
    calculatorState.displayValue = "0";
  } else {
    calculatorState.displayValue = displayValue.substring(
      0,
      displayValue.length - 1
    );
  }
  updateDisplayUI();
}

function handleClear() {
  resetStateValues(
    "displayValue",
    "firstOperand",
    "operator",
    "previousKeyType"
  );
  updateDisplayUI();
}

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
  const input = e.key ? e.key : e.target.innerText;
  if (calculatorState.previousKeyType === "operator") {
    setCalculateStateValue("firstOperand", calculatorState.displayValue);
    resetStateValues("displayValue");
  }
  updateDisplayValue(input);
  updateDisplayUI();
  setCalculateStateValue("previousKeyType", "number");
}

function handleOperator(e) {
  const input = e.key ? e.key : e.target.innerText;
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
  setCalculateStateValue("operator", input);
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
