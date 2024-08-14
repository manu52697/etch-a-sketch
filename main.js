// const validator = require('./lib/validator');
import {Validator, Rule} from "./lib/validator.js";

// setup
const inputValidator = new Validator(
    'input is num, 0 < input < 100',
        new Rule(
            `isn't null`, (i) => i != null
        ),
        new Rule(
            'is number', (i) => typeof i == 'number'
        ),
        new Rule(
            'is positive number', (i) => i >= 0
        ),
        new Rule(
            `isn't bigger than 100`, (i) => i <= 100
        )
);

const gridDefaults = {
    gridSize: 16,
}

const gridOptions = {
    gridSize: gridDefaults.gridSize,
}

/* Render behaviour */

function display(options){
    const container = document.getElementById('container')
    if(container == null){
        return false;
    }
    // console.log('painting')
    options.cellSize = 90 / options.gridSize;
    // options.rowCount = Math.ceil((2/3) * options.gridSize);
    options.rowCount = options.gridSize;
    container.replaceChildren(); // empty the container
    paintGrid(container, options) // render the new container
}

function paintGrid(grid, options){
   for (let i=0; i < options.rowCount; i++){
        for(let j=0; j < options.gridSize; j++){
            const current = createDiv(options.cellSize);
            // current.textContent= `${i}, ${j}`;
            grid.append(current)
        }
   }
}

function createDiv(s){
    const div = document.createElement('div');
    div.className = 'cell'
    div.style.width = `${s}vh`; // to fill the vw;
    div.style.minWidth = `$${s}vh;`
    div.style.aspectRatio = 1;
    div.addEventListener(
        'mouseenter', 
        (ev) => paintCell(ev.target)
    )
    return div;
}


function promptUser(){
    let usrInput = prompt(`How big must the new grid be?`);
    try {
        usrInput = parseInt(usrInput);
        if(!inputValidator.validate(usrInput)){
            throw new Error();
        }
        // if 0, use default value
        if(usrInput == 0) {
            console.info('using default gridSize: ' + gridDefaults.gridSize);
            usrInput = gridDefaults.gridSize;
        }
        display({gridSize: usrInput})
    } catch (error) {
        console.error('Malformed input: ' + usrInput);
    }
}

function paintCell(div){
    div.classList.add('painted-cell');
    // console.info('painting cell!');

    // comment the timeout to have persistent color change
    setTimeout((x) => {
        div.classList.remove('painted-cell')
    },
    1000 * 1);
}

/* Main thing */
display(gridOptions)

/* Event listeners */

const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", () => {
    promptUser();
});