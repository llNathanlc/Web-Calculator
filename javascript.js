const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.number');
const result2 = document.getElementById("result2");
const result1 = document.getElementById("result1");
const resetButton = document.getElementById('reset');
const deleteButton = document.getElementById('delete');
const addButton = document.getElementById('add');
const substractButton = document.getElementById('substract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const equalsButton = document.getElementById('equals');
const ansButton = document.getElementById('anterior');

let savedString = '';
let anteriorNumber = '';
let ans = 0;
let numberB = 0;
let result = 0;
let operation = '';
let array = [];
function buttonsAnimation() {
    buttons.forEach(button => {
        button.addEventListener('mousedown', function () {
            this.classList.add('click');
        });
        button.addEventListener('mouseup', function () {
            this.classList.remove('click');
        })
        button.addEventListener('mouseover', function () {
            this.classList.add('hover');
        });
        button.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
            this.classList.remove('click');
        });
    });
}
function deleteLast() {

}

function deleteCero() {
    if (result2.textContent.charAt(0) == '0') { result2.textContent = ""; }
}
function functions() {
    while (array.length > 0) {
        result = parseInt(array.shift());
        if (array[0] === '+') {array.shift(); result += parseInt(array.shift()); array.unshift(result);console.log(array);}
        else if (array[0] === '-') {array.shift(); result -= parseInt(array.shift()); array.unshift(result);console.log(array);}
        else if (array[0] === 'x') {array.shift(); result *= parseInt(array.shift()); array.unshift(result);console.log(array);}
        else if (array[0] === '/') {array.shift(); result /= parseInt(array.shift()); array.unshift(result);console.log(array);}
        console.log(array);
        console.log(result);
    }
    ans = result;
}
function operationButtons() {
    //Get numbers
    numbers.forEach(numberButton => {
        numberButton.addEventListener('mousedown', function () {
            anteriorNumber += this.textContent;
            savedString += this.textContent;
            result2.textContent = savedString;
        });
    })

    resetButton.addEventListener('mousedown', function () {
        savedString = '';
        anteriorNumber = '';
        result1.textContent = '';
        result2.textContent = '0';
        resetArray();
    });
    addButton.addEventListener('mousedown', function () {
        if (anteriorNumber != '') { array.push(parseInt(anteriorNumber)); }
        array.push(this.textContent);
        anteriorNumber = '';
        savedString += this.textContent;
        result2.textContent = savedString;
    });
    substractButton.addEventListener('mousedown', function () {
        if (anteriorNumber != '') { array.push(parseInt(anteriorNumber)); }
        array.push(this.textContent);
        anteriorNumber = '';
        savedString += this.textContent;
        result2.textContent = savedString;
    });
    multiplyButton.addEventListener('mousedown', function () {
        if (anteriorNumber != '') { array.push(parseInt(anteriorNumber)); }
        array.push(this.textContent);
        anteriorNumber = '';
        savedString += this.textContent;
        result2.textContent = savedString;
    });
    divideButton.addEventListener('mousedown', function () {
        if (anteriorNumber != '') { array.push(parseInt(anteriorNumber)); }
        array.push(this.textContent);
        anteriorNumber = '';
        savedString += this.textContent;
        result2.textContent = savedString;
    });
    equalsButton.addEventListener('mousedown', function () {
        if (anteriorNumber != '') { array.push(parseInt(anteriorNumber)); }
        console.log(array);
        functions();
        anteriorNumber = '';
        result2.textContent = result;
        result1.textContent = savedString;
        result1.textContent += '=';
        savedString='';

    });
    deleteButton.addEventListener('mousedown', function () {
        if(result2.textContent=='0'){return;}
        else{
            savedString = savedString.substring(0,savedString.length-1);
            result2.textContent=savedString;
        }
    });
    ansButton.addEventListener('mousedown',function(){
        if (anteriorNumber != '') { array.push(parseInt(anteriorNumber)); }
        anteriorNumber = '';
        savedString=ans;
        result2.textContent=savedString;
    })

}
function resetArray() {
    while (array.length != 0) { array.pop(); }
}
function start() {
    buttonsAnimation();

    deleteLast();
    operationButtons();
}
start();