var previousOutputs = document.getElementById('previous-outputs');
var output = document.getElementById('output');
var buttons = document.getElementsByClassName('button');
var values = [0];
var operations = [];
var decimalPlace = 1;

function buttonClick() {
    let input = this.dataset.input;
    switch (input) {
        case '+':
        case '-':
        case '*':
        case '/':
            addNewOperation(input);
            break;
        case '.':
            if(decimalPlace === 1) {
                decimalPlace *= 0.1;
            }
            break;
        case '=':
            updatePreviousOutputs(calculateResult());
            resetCalculation();
            break;
        case 'clear':
            resetCalculation();
            break;
        default:
            addNewNumber(input);    
    }
    updateOutput();
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
                    result /= values[index];
                    break;
            }
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
        button.addEventListener('click', buttonClick, false);
    }
});