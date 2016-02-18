var chain = []; //This array will hold the chained inputs from the calculator
var output;     //This variable holds any ongoing output to be displayed on the screen

//Check to see if the chain is empty or undefined
function chainIs§Empty() {
    if (typeof(chain) === "undefined" || chain.length < 0) {
        return true;
    }
    return false;
}

//Check to see if the last item in the chain is a number
function endsInNumber() {
    if (isNaN(Number(chain[chain.length-1]))) {
        return false;
    }
    return true;
}

//clearDisplay will set the screen display to 0
function clearDisplay() {
    output = 0;
}

//Error Function - ends the program, clears the chain and displays 'Error' on the screen
function err() {
    chain = [];
    output = "Error";
    console.log(output);
}

//Execute the current chain of calculations, assuming that the chain has a valid end
//(i.e. it ends in a number!)
function executeChain() {
    var current;    //Holds a running total

    //Check that the last item in the chain is a number
    if (!endsInNumber()) {
        err();
        return;
    }

    //Code to execute the chain
    console.log("Here is where you would now see some calculating going down");
}

//Mathematical Operator Parser - accepts a string and a pair of numbers and performs the appropriate operation
function mathematise(op, x, y) {
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

//Number Conversion Function - Checks that the chain elements on either side are operators and converts to a number
function numeric(element) {
    if (element === 0 || element === (chain.length - 1) || isNaN(Number(chain[element-1])) && isNaN(Number(chain[element+1]))) {
        return Number(chain[element]);
    }

    err();
    return;
}

//Reset the count and display
function reset() {
    chain = [];
    clearDisplay();
}

function equals() {
    if (chainIsEmpty()) {
        err();
        return;
    }

    if (!endsInNumber()) {
        err();
        return;
    }

    executeChain();
}

function appendOperator(operator) {
    if (chainIsEmpty) {
        err();
        return;
    }

    if (!endsInNumber) {
        err();
        return;
    }
    else {
        chain.push(operator);
    } 
}
