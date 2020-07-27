//Extracting Ans button
const ansButton = document.getElementById("ansButton");
let answer = 0;

//Extracting display parts
const typedDisplay = document.getElementById("typed");
const resultDisplay = document.getElementById("result");

const allButtons = document.getElementsByClassName("key");
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (e) {
    console.log(e.target.innerHTML);
    if (e.target.innerHTML != "&lt;") {
      writeCharacter(e.target.innerHTML);
    }
  });
}

//Extracting all operators
const equalButton = document.getElementById("equalButton");
const cancelButton = document.getElementById("cancelButton");

// Backspace button functionality
const backspaceButton = document.getElementById("backSpace");
backspaceButton.addEventListener("click", function () {
  console.log(typeof typedDisplay.innerHTML);
  typedDisplay.innerHTML = typedDisplay.innerHTML.slice(0, -1);
});

//Cancel button functionality
cancelButton.addEventListener("click", function () {
  typedDisplay.innerHTML = "0";
  resultDisplay.innerHTML = "0";
});

//Function for writing character to display
function writeCharacter(ch) {
  //Handling Square button
  let flag = true;
  if (ch == "x^2") {
    let lastNumber = "";
    for (let i = typedDisplay.innerHTML.length - 1; i >= 0; i--) {
      const digit = typedDisplay.innerHTML[i];
      if (digit != "+" || digit != "-" || digit != "x" || digit != "/") {
        lastNumber = digit + lastNumber;
        continue;
      }
      break;
    }
    if (lastNumber.length > 1) {
      ch = lastNumber.split().reverse();
    } else {
      ch = lastNumber;
    }
    let square = ch * ch;
    ch = square;
    flag = false;
  }

  //Clearing Display and adding new
  if (typedDisplay.innerHTML == "0" || resultDisplay.innerHTML != "0") {
    resultDisplay.innerHTML = "0";
    typedDisplay.innerHTML = ch;
    flag = true;
  } else if (flag == false) {
    resultDisplay.innerHTML = ch;
    flag = true;
  } else {
    typedDisplay.innerHTML = typedDisplay.innerHTML + ch;
  }
}

//Function for extracting operands and operators
function calculateResult() {
  let typedText = typedDisplay.innerHTML;
  if (typedText == "Ans") {
    resultDisplay.innerHTML = answer;
    return;
  }
  typedText = typedText.replace(/x/g, "*");
  typedText = typedText.replace(/Ans/g, answer);
  try {
    resultDisplay.innerHTML = eval(typedText);
    answer = resultDisplay.innerHTML;
  } catch (err) {
    resultDisplay.innerHTML = "Syntax Error";
  }
}

//Equal button functionality
equalButton.addEventListener("click", calculateResult);
