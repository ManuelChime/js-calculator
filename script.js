const display = document.querySelector("#display")
const buttons = document.querySelectorAll(".btn")
const history = document.querySelector("#prevDisplay");

let currentInput = "";
let prevInput = "";
let op = null;

buttons.forEach((btn) => {
    btn.addEventListener('click',function (e) {
        let val = e.target.value;
        if (val === "C") {
            currentInput = "";
            prevInput = "";
            op = null;
            updateDisplay(0);
            history.textContent = "";
            return;
        }
        if (val === "D") {
            currentInput = currentInput.slice(0, -1); //Remove the last character in the string
            updateDisplay(currentInput);
            return;
        }
        if (val === "=") {
            if (currentInput === "" || prevInput === "" ) return; //check if we have enough data to operate
            history.textContent = `${prevInput} ${op} ${currentInput}`;
            currentInput = operate();
            updateDisplay(currentInput);
            prevInput = currentInput;
            currentInput = "";

            return;
        }
        if (val === ".") {
            if (currentInput.includes(".")) return;
            if (currentInput === "") {
                currentInput = "0.";
            } else {
                currentInput += ".";
            }
            updateDisplay(currentInput);
            return; 
        }

        if (["+","-","*","/"].includes(val)) { //check if the button is operator
            handleOperator(val);
            return;
        }
        currentInput += val;
        updateDisplay(currentInput);
    })
}
);

function handleOperator(nextOp){
    if (currentInput === "") {
        op = nextOp; // Just change the operator and wait
        return;
    }
    if (currentInput && op) {
        currentInput =  operate();
        updateDisplay(currentInput);
        history.textContent = `${prevInput} ${op} ${currentInput}`;
    }
    prevInput = currentInput;
    currentInput = "";
    op = nextOp;
}

function add(num1,num2){
    return num1 + num2;
}
function subtract(num1,num2){
    return num1 - num2;
}
function multiply(num1,num2) {
    return num1 * num2;
}
function divide(num1,num2) {
    return num1 / num2;
}

function operate() {
    let num1 = Number(prevInput);
    let num2 = Number(currentInput);
    let result;
    switch (op) {
        case '+':
            result = add(num1,num2).toFixed(6);
            break;
        case '-':
            result = subtract(num1,num2).toFixed(6);
            break;
        case '*':
             result = multiply(num1,num2).toFixed(6);
            break;
        case '/':
            if(num2 == 0) return "Error";
             result = divide(num1,num2).toFixed(6);
            break;
        default:
            break;
    }
    return parseFloat(result);
}
function updateDisplay(value){
    display.textContent = value;
}