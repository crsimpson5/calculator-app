let output = "0";
let operator = null;

function formatNum(numStr) {
  if (numStr.match(/\./)) {
    let [wholeNums, decimals] = numStr.split(".");

    wholeNums = parseFloat(wholeNums).toLocaleString();
    return [wholeNums, decimals].join(".");
  }

  return parseFloat(numStr).toLocaleString();
}

function updateDisplay() {
  let screenText = "";

  if (operator) {
    let [num1, num2] = output.split(/[+\-x/]/);
    console.log({ num1, operator, num2 });
    screenText = formatNum(num1) + operator;

    if (num2) {
      screenText += formatNum(num2);
    }
  } else {
    screenText = formatNum(output);
  }

  document.querySelector(".screen").textContent = screenText;
}

function handleNumKeyPress(e) {
  const value = e.target.dataset.num;

  output = output + value;
  updateDisplay();
}

const numberKeys = document.querySelectorAll(".key[data-num]");
numberKeys.forEach((key) => key.addEventListener("click", handleNumKeyPress));

function handleDelPress() {
  if (output.slice(-1).match(/[+\-x/]/)) {
    operator = null;
  }

  if (output.length === 1) {
    output = "0";
  } else {
    output = output.slice(0, -1);
  }
  updateDisplay();
}

document
  .querySelector(".key[data-action='delete'")
  .addEventListener("click", handleDelPress);

function handleOperatorPress(e) {
  if (operator) return;

  const operation = e.target.dataset.operation;

  switch (operation) {
    case "add":
      operator = "+";
      break;
    case "multiply":
      operator = "x";
      break;
    case "divide":
      operator = "/";
      break;
    case "subtract":
      operator = "-";
      break;
  }

  output += operator;
  updateDisplay();
}

const operatorKeys = document.querySelectorAll(".key[data-operation]");
operatorKeys.forEach((key) =>
  key.addEventListener("click", handleOperatorPress)
);

function handleDecimalPress() {
  let [num1, num2] = output.split(/[+\-x/]/);

  if (operator && !num2.match(/\./)) {
    if (!num2) {
      output += "0";
    }
    output += ".";
  } else if (!num1.match(/\./)) {
    output += ".";
  }

  updateDisplay();
}

document
  .querySelector(".key[data-action='decimal'")
  .addEventListener("click", handleDecimalPress);

function evaluate() {
  let [num1, num2] = output.split(/[+\-x/]/);
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num2)) return;

  switch (operator) {
    case "+":
      output = num1 + num2;
      break;
    case "-":
      output = num1 - num2;
      break;
    case "x":
      output = num1 * num2;
      break;
    case "/":
      output = num1 / num2;
      break;
  }

  if (!isFinite(output)) {
    output = "0";
  } else {
    output = output.toString();
  }

  operator = null;
  updateDisplay();
}

document
  .querySelector(".key[data-action='equals'")
  .addEventListener("click", evaluate);

function reset() {
  output = "0";
  operator = null;
  updateDisplay();
}

document
  .querySelector(".key[data-action='reset'")
  .addEventListener("click", reset);

function handleKeyboardRelease() {
  document
    .querySelectorAll(".key-down")
    .forEach((el) => el.classList.remove("key-down"));
}

document.addEventListener("keyup", handleKeyboardRelease);

// Initialize screen
updateDisplay();
