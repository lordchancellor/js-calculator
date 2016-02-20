var chain = [];     //This array will hold the chained inputs from the calculator
var output = 0;     //This variable holds any ongoing output to be displayed on the screen
var answer = 0;     //Holds the previous answer, so that it can be called into the next calculation

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
}

//Empties the chain for the next pass of calculations
function clearChain() {
    chain = [];
}

//Error Function - ends the program, clears the chain and displays 'Error' on the screen
function err(message) {
    console.error(message);
    clearChain();
    output = "Error";
    console.log(output);
}

//Execute the current chain of calculations, assuming that the chain has a valid end
//(i.e. it ends in a number!)
function executeChain() {
    var current;    //Holds a running total

    //Check that the last item in the chain is a number
    if (!endsInNumber()) {
        err("Chain does not end in a number");
        return;
    }

    //Code to execute the chain
    console.log("Here is where you would now see some calculating going down");
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
            return x / y;
            break;
        default:
            err();
    }
}

//Reset the count and display
function reset() {
    clearChain();
    clearDisplay();
}

function equals() {
    if (chainIsEmpty()) {
        err("The chain is empty");
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
    if (chainIsEmpty()) {
        err("The chain is empty");
        return;
    }

    if (!endsInNumber()) {
        err("The chain does not end in a number");
        return;
    }
    else {
        chain.push(operator);
    }
}

//Check to see if the current chain element meets conditions for a decimal point and append one if so
function appendDecimal() {
    var current = chain.length - 1;

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
}

//The user has pressed a number key
function appendNumber(number) {
    var current = chain.length - 1;

    if (chainIsEmpty() || !endsInNumber()) {
        chain.push(number);
    }
    else {
        chain[current] = chain[current] + number;
    }
}

//The user has pressed the -/+ button
function reverseSign() {
    var current = chain.length - 1;

    if (chainIsEmpty() || !endsInNumber()) {
        chain.push("-");
        return;
    }

    if (!isNaN(Number(chain[current]))) {
        if (Number(chain[current]) >= 0) {
            chain[current] = "-" + chain[current];
        }
        else {
            chain[current] = chain[current].substring(1);
        }
    }
}

//The user has pressed the ANSWER button - pulls the most recent answer into the chain
function answer() {
    if (chainIsEmpty() || !endsInNumber()) {
        chain.push(answer);
        return;
    }
    else if (endsInNumber()) {
        clearChain();
        chain.push(answer);
        return;
    }
    else {
        chain[chain.length - 1] = chain[chain.length - 1] + answer;
    }
}

//Run the current set of calculations - called every time the user presses an operator or the equals button
function calculate() {
    //If the chain only contains a single number we don't do much here
    if (chain.length === 1) {
        output = answer = chain[0];
        return;
    }

    //Assuming everything is working correctly, the chain length will be 3 at this point ([number, operator, number])
    if (chain.length === 3) {
        output = mathematise(Number(chain[0]), chain[1], Number(chain[2]));
        answer = output;
        clearChain();
        console.log(output);
        return;
    }

    err("Invalid number of items in the chain");
    return;
}
