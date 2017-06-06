var previousOutputs = document.getElementById('previous-outputs');
var output = document.getElementById('output');
var buttons = document.getElementsByClassName('button');
var values = [0];
var operations = [];
var decimalPlace = 1;

function switchInput(input) {
    switch(input) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            addNewNumber(input);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            addNewOperation(input);
            break;
        case '.':
            decreateDecimalPlace();
            break;
        case '=':
        case 'Enter':
            updatePreviousOutputs(calculateResult());
            resetCalculation();
            break;
        case 'clear':
        case 'Delete':
            resetCalculation();
            break;
    }
    updateOutput();
}

function handleButtonClick() {
    let input = this.dataset.input;
    switchInput(input);
    
}

function handleKeyboardPress(event) {
    let input = event.key;
    switchInput(input);
}

function decreateDecimalPlace() {
    if(decimalPlace === 1) {
        decimalPlace *= 0.1;
    }
}

function addNewNumber(input) {
    if(decimalPlace === 1) {
        values[values.length - 1] *= 10;
        values[values.length - 1] += Number(input);
    } else {
        values[values.length - 1] += Number(input) * decimalPlace;
        decimalPlace *= 0.1;
    }
}

function addNewOperation(input) {
    operations.push(input)
    values.push(0);
    decimalPlace = 1;
}

function resetCalculation() {
    values = [0];
    operations = [];
    decimalPlace = 1;
}

function calculateResult() {
    let result = values[0];
    let errorOccured = false;
    for(let index = 1; index < values.length; index++) {
        if(values[index] !== undefined) {
            switch(operations[index - 1]) {
                case '+':
                    result += values[index];
                    break;
                case '-':
                    result -= values[index];
                    break;
                case '*':
                    result *= values[index];
                    break;
                case '/':
                    if(values[index] === 0) {
                        errorOccured = true;
                    }else {
                        result /= values[index];
                    }
                    break;
            }
        }
        if(errorOccured) {
            result = 'You tried to divide by 0!';
        }
    }
    return result;
}

function updateOutput() {
    output.innerText = '';
    for(let i = 0; i < values.length; i++) {
        output.innerText += values[i];
        if(operations[i] !== undefined) {
            output.innerText += operations[i];
        }
    }
}

function updatePreviousOutputs(result) {
    previousOutputs.innerText = result + '\n' + previousOutputs.innerText;
}

window.addEventListener('load', function(){
    previousOutputs.innerText = '';
    updateOutput();
    for(button of buttons) {
        button.addEventListener('click', handleButtonClick, false);
    }
    window.addEventListener('keyup', function(event){
        handleKeyboardPress(event);
    }, true);
});