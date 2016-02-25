var chain = [];     //This array will hold the chained inputs from the calculator
var output = 0;     //This variable holds any ongoing output to be displayed on the screen
var answer = 0;     //Holds the previous answer, so that it can be called into the next calculation
var didPressAns = false;    //Check to see if the ANSWER button has been pressed (in which case, we don't want to allow number appending)

//Check to see if the chain is empty or undefined
function chainIsEmpty() {
    if (typeof(chain) === "undefined" || chain.length < 1) {
        return true;
    }
    return false;
}

//Check to see if the last item in the chain is a number
function endsInNumber() {
    var current = chain.length - 1;

    //Check to see if a '-' is next to another operator (in which case it's the start of a negative number)
    if (chain[current] === "-" && isNaN(Number(chain[current-1]))) {
        return true;
    }
    else if (isNaN(Number(chain[current]))) {
        return false;
    }
    return true;
}

//clearDisplay will set the screen display to 0
function clearDisplay() {
    output = 0;
    updateDisplay(output);
}

//Empties the chain for the next pass of calculations
function clearChain() {
    chain = [];
}

//Error Function - ends the program, clears the chain and displays 'Error' on the screen
function err(message) {
    console.error(message);
    output = "Error";
    updateDisplay(output);
    console.log(output);
    clearChain();
}

//Mathematical Operator Parser - accepts a string and a pair of numbers and performs the appropriate operation
function mathematise(x, op, y) {
    switch(op) {
        case "+":
            return x + y;
            break;
        case "-":
            return x - y;
            break;
        case "*":
            return x * y;
            break;
        case "/":
            if (x === 0) {
                return 0;
                break;
            }
            else if (y === 0) {
                return "dbz";   //Divide By Zero (Error);
                break;
            }
            return x / y;
            break;
        default:
            err("Invalid operator");
            return;
    }
}

//Reset the count and display
function reset() {
    clearChain();
    clearDisplay();
}

//Reset the current step/button-press
function clearStep() {
    if (endsInNumber()) {
        chain.pop();
        updateDisplay("0");
    }
}

//Update the calculator display as we go
function updateDisplay(display) {
    var displayPanel = document.getElementById("output");
    displayPanel.textContent = display;

    console.log("Displayed: " + display);
    console.log("Current Chain: " + chain);
}

function equals() {
    if (chainIsEmpty()) {
        answer = output = 0;
        updateDisplay(output);
        return;
    }

    if (!endsInNumber()) {
        err("The chain does not end in a number");
        return;
    }

    calculate();
}

//Append an operator to the end of the chain
function appendOperator(operator) {
    if (didPressAns) {
        didPressAns = false;
    }
    
    if (chainIsEmpty()) {
        chain.push(answer);
        updateDisplay(answer);
    }

    if (!endsInNumber()) {
        err("The chain does not end in a number");
        return;
    }
    else {
        if (chain.length === 3) {
            calculate();
            chain.push(answer);
        }
        chain.push(operator);
    }
}

//Check to see if the current chain element meets conditions for a decimal point and append one if so
function appendDecimal() {
    var current = chain.length - 1;
    
    if (didPressAns) {
        chain.pop();
        didPressAns = false;
    }

    if (chainIsEmpty() || isNaN(Number(chain[current]))) {
        chain.push("0.");
    }
    else {
        //Check to see if the number already contains a decimal place
        if (Number(chain[current]) % 1 === 0 && chain[current].indexOf(".") === -1) {
            chain[current] = chain[current] + ".";
        }
        else {
            err("The current number already contains a decimal point");
            return;
        }
    }
    updateDisplay(chain[current]);
}

//The user has pressed a number key
function appendNumber(number) {
    if (didPressAns) {
        chain.pop();
        didPressAns = false;
    }

    if (chainIsEmpty() || !endsInNumber()) {
        chain.push(number);
    }
    else {
        chain[chain.length-1] = chain[chain.length-1] + number;
    }
    updateDisplay(chain[chain.length-1]);
    console.log(output);
}

//The user has pressed the -/+ button
function reverseSign() {
    if (chainIsEmpty() || !endsInNumber()) {
        chain.push("-");
        updateDisplay(chain[chain.length-1]);
        return;
    }

    var current = chain.length - 1;
    
    if (!isNaN(Number(chain[current]))) {
        if (Number(chain[current]) >= 0) {
            chain[current] = "-" + chain[current];
        }
        else {
            chain[current] = chain[current].substring(1);
        }
        updateDisplay(chain[current]);
    }
}

//The user has pressed the ANSWER button - pulls the most recent answer into the chain
function prevAnswer() {
    if (chainIsEmpty() || !endsInNumber()) {
        chain.push(String(answer));
        console.log("Pushing " + answer + " to the chain");
    }
    else if (endsInNumber()) {
        clearChain();
        console.log("Clearing the chain...");
        chain.push(String(answer));
        console.log("Pushing " + answer + " to the chain");
    }
    else {
        chain[chain.length - 1] = chain[chain.length - 1] + String(answer);
        console.log("Pushing " + answer + " to the chain");
    }
    updateDisplay(chain[chain.length-1]);
    didPressAns = true;
    return;
}

//Run the current set of calculations - called every time the user presses an operator or the equals button
function calculate() {
    //If the chain only contains a single number we don't do much here
    if (chain.length === 1) {
        output = answer = chain[0];
        updateDisplay(output);
        return;
    }

    //Assuming everything is working correctly, the chain length will be 3 at this point ([number, operator, number])
    if (chain.length === 3) {
        output = mathematise(Number(chain[0]), chain[1], Number(chain[2]));

        if (output === "dbz") {
            err("You cannot divide by zero");
            return;
        }

        answer = output;
        updateDisplay(output);
        clearChain();
        console.log(output);
        return;
    }

    err("Invalid number of items in the chain");
    return;
}
