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
const percentageButton = document.getElementById('percentage');
const equalsButton = document.getElementById('equals');
const ansButton = document.getElementById('anterior');
const pointButton = document.getElementById('point');
const ansText = document.getElementById('ansresult');


let savedString = '';
let anteriorNumber = '';
let ans = 0;
let numberB = 0;
let result = 0;
let operation = '';
let array = [];
let auxArray = [];
let pointActive = true;

function buttonsAnimation() {
    buttons.forEach(button => {
        button.addEventListener('pointerdown', function () {
            this.classList.add('click');
        });
        button.addEventListener('pointerup', function () {
            this.classList.remove('click');
        })
        button.addEventListener('pointerover', function () {
            this.classList.add('hover');
        });
        button.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
            this.classList.remove('click');
        });
    });
}

function functions() {
    let aux;
    let resAux;
    let operIndex = 0;
    if (array[0] == '-') { array.splice(0, 2, -array[1]); }
    while (array.includes('x') || array.includes('/') || array.includes('%')) {
        if (array.includes('%')) {
            findPercentage = array.findIndex(perc => perc == '%');
            array.splice(findPercentage, 1, '/', 100);
        }
        operIndex = array.findIndex(op => op == 'x' || op == '/');
        aux = array.splice(operIndex - 1, 3);
        while (aux.length > 0) {
            resAux = aux.shift();
            if (aux[0] === 'x') { aux.shift(); resAux *= aux.shift(); array.splice(operIndex - 1, 0, resAux); console.log(array); }
            else if (aux[0] === '/') { aux.shift(); resAux /= aux.shift(); array.splice(operIndex - 1, 0, resAux); console.log(array); }
        }
    }
    while (array.length > 0) {
        result = array.shift();
        if (array[0] === '+') { array.shift(); result += array.shift(); array.unshift(result); console.log(array); }
        else if (array[0] === '-') { array.shift(); result -= array.shift(); array.unshift(result); console.log(array); }
    }
    ans = result;
}

function operationButtons() {
    //Get numbers
    numbers.forEach(numberButton => {
        numberButton.addEventListener('pointerdown', numberButtonsLogic);
    });

    resetButton.addEventListener('pointerdown', function () {
        savedString = '';
        anteriorNumber = '';
        ans = 0;
        result = 0;
        result1.textContent = '';
        result2.textContent = '0';
        ansText.textContent='';
        resetArray(array);
        resetArray(auxArray);
        addListener(pointButton, 'pointerdown');
    });

    addButton.addEventListener('pointerdown', operationButtonsLogic,);

    substractButton.addEventListener('pointerdown', operationButtonsLogic);

    multiplyButton.addEventListener('pointerdown', operationButtonsLogic);

    divideButton.addEventListener('pointerdown', operationButtonsLogic);

    percentageButton.addEventListener('pointerdown', operationButtonsLogic);

    addListener(pointButton, 'pointerdown');
    pointButton.addEventListener('pointerup', function () {
        removeListener();
    });

    equalsButton.addEventListener('pointerdown', function () {
        if (anteriorNumber != '') {
            array.push(parseFloat(anteriorNumber));
        }
        auxArray = array.slice(0);
        functions();
        anteriorNumber = '';
        console.log(result);
        result2.textContent = result;
        result1.textContent = savedString;
        result1.textContent += '=';
        ansText.textContent = 'Ans=  ' + ans;
        savedString = '';
        addListener(pointButton, 'pointerdown');
    });

    deleteButton.addEventListener('pointerdown', function () {
        if (anteriorNumber != '') {
            array.push(parseFloat(anteriorNumber));
        }
        if (array.length == 0) {
            array = auxArray.slice(0);
            resetArray(auxArray);

            if (savedString == '' && result1.textContent != '') {
                savedString = result1.textContent.substring(0, result1.textContent.length - 1);
                result1.textContent = '';
            }
            else if (savedString.length == 0) {
                result2.textContent = 0; return;
            }
            result2.textContent = savedString; 
            return;
        }
        anteriorNumber = '';
        if (isNaN(array[array.length - 1])) { array.pop(); }
        else if (array[array.length - 1].toString().length == 1) { array.pop(); }
        else if (array[array.length - 1].toString().length > 1) { array.splice(array.length - 1, 1, parseFloat(array[array.length - 1].toString().substring(0, array[array.length - 1].toString().length - 1))); }
        else if (array.length = 1) { array.pop(); }
        savedString = savedString.substring(0, savedString.length - 1);

        if (savedString == '' && result1.textContent != '') {
            savedString = result1.textContent.substring(0, result1.textContent.length - 1);
            result1.textContent = '';
        }
        else if (savedString.length == 0) {
            result2.textContent = 0; return;
        }
        result2.textContent = savedString;

    });

    ansButton.addEventListener('pointerdown', function () {
        if (ans == 0) { return; }
        anteriorNumber += ans;
        savedString += ans;
        result1.textContent = '';
        result2.textContent = savedString;
        addListener(pointButton, 'pointerdown');
    });
}

let currentController;
function addListener(element, eventType) {
    if (currentController) {
        currentController.abort();
    }

    currentController = new AbortController();
    const { signal } = currentController;

    element.addEventListener(eventType, numberButtonsLogic, { signal });
}

function removeListener() {
    if (currentController) {
        currentController.abort();
        currentController = null;
    }
}

function numberButtonsLogic() {
    anteriorNumber += this.textContent;
    savedString += this.textContent;
    result1.textContent = '';
    result2.textContent = savedString;
}

function operationButtonsLogic() {
    if (anteriorNumber != '') {
        array.push(parseFloat(anteriorNumber));
    }
    if(array.length == 0){array.push(parseFloat(ans));savedString += ans;}
    array.push(this.textContent);
    anteriorNumber = '';
    savedString += this.textContent;
    result2.textContent = savedString;
    result1.textContent = "";
    addListener(pointButton, 'pointerdown');
}

function resetArray(arr) {
    while (arr.length != 0) { arr.pop(); }
}

function start() {
    buttonsAnimation();
    operationButtons();
}
start();