// const validator = require('./lib/validator');
import {Validator, Rule} from "./lib/validator.js";

// setup
const inputValidator = new Validator(
    'input is num, 0 < input < 100', [
        new Rule(
            `isn't null`, (i) => i != null
        ),
        new Rule(
            'is number', (i) => typeof i == 'number'
        ),
        new Rule(
            'is positive number', (i) => i > 0
        ),
        new Rule(
            `isn't bigger than 100`, (i) => i <= 100
        ),
    ]
);

const gridOptions = {
    gridSize: 16,
}

/* Render behaviour */

function display(options){
    const container = document.getElementById('container')
    if(container == null){
        return false;
    }
    console.log('painting')
    options.cellSize = 90/options.gridSize;
    options.rowCount = Math.ceil((2/3) * options.gridSize);
    container.replaceChildren(); // empty the container
    paintGrid(container, options) // render the new container
}

function paintGrid(grid, options){
    /* 
    function to fill the div.container element with n*n
    divs.
    container width is 100vw, height is 90vh
    */
   for (let i=0; i < options.rowCount; i++){
    for(let j=0; j < options.gridSize; j++){
        const current = createDiv(options.cellSize);
        current.textContent= `${i}, ${j}`
        grid.append(current)
    }
   }
}

function createDiv(s){
    const div = document.createElement('div');
    div.className = 'cell'
    div.style.width = `${s}vw`; // to fill the vw;
    div.style.aspectRatio = 1;
    return div;
}


function promptUser(){
    let usrInput = prompt(`How big must the new grid be?`);
    if(!inputValidator.validate(usrInput)){
        console.error('Malformed input: ' + usrInput);
        promptUser();
    }
    display({gridSize: usrInput})

}

display(gridOptions)

/* Event listeners */

const resetButton = document.getElementById('reset');
resetButton.addEventListener(onclick, () => {
    promptUser();
})