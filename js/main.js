var chain = []; //This array will hold the chained inputs from the calculator
var output;     //This variable holds any ongoing output to be displayed on the screen

//clearDisplay will set the screen display to 0
function clearDisplay() {
    output = 0;
}

//Error Function - ends the program, clears the chain and displays 'Error' on the screen
function err() {
    chain = [];
    output = "Error";
    console.log(output);
    return;
}

//Execute the current chain of calculations, assuming that the chain has a valid end
//(i.e. it ends in a number!)
function executeChain() {
    var current;    //Holds a running total
    //Check that the last item in the chain is a number
    if (isNaN(Number(chain[chain.length-1]))) {
        err();
    }
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
    if (element === 0 || element === (chain.length - 1) || isNaN(chain[element-1]) && isNaN(chain[element+1])) {
        return Number(chain[element]);
    }

    err();
}

//Reset the count and display
function reset() {
    chain = [];
    clearDisplay();
}
