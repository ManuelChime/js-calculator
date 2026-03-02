const display = document.querySelector("#display")
const buttons = document.querySelectorAll(".btn")

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
            return;
        }
        if (val === "D") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
            return;
        }
        if (val === "=") {
            if (currentInput === "" || prevInput === "" ) return; //check if we have enough data to operate
            currentInput = operate();
            updateDisplay(currentInput);
            prevInput = currentInput;
            currentInput = "";

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
    switch (op) {
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case '*':
             return multiply(num1,num2);
            break;
        case '/':
             return divide(num1,num2);
            break;
        default:
            break;
    }
}
function updateDisplay(value){
    display.textContent = value;
}