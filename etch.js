const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000'

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor
    colorPicker.value = newColor
}

function setCurrentSize(newSize) {
    currentSize = newSize
}



const screen = document.getElementById('screen')
const slider = document.getElementById('sizeSlider')
const sizeValue = document.getElementById('sizeValue')
const eraser = document.getElementById('eraser')
const reset = document.getElementById('reset')
const colorPicker = document.getElementById('color-picker')

reset.addEventListener('click', () => reloadGrid())
eraser.addEventListener('click', () => setCurrentColor("#ffffff"))
colorPicker.oninput = (e) => setCurrentColor(e.target.value)

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


slider.onchange = (e) => changeSize(e.target.value)



function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = currentColor
}

function setupGrid(size) {
    screen.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    screen.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0; i < size * size; i++) {
        const dot = document.createElement('div')
        dot.classList.add('dot')
        dot.addEventListener('mouseover', changeColor)
        dot.addEventListener('mousedown', changeColor)
        screen.appendChild(dot)
    }
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function updateSizeValue(size) {
    sizeValue.innerHTML = `${size} x ${size}`
}

function clearGrid() {
    screen.innerHTML = ''
}


window.onload = () => {
    changeSize(DEFAULT_SIZE)
    setCurrentColor(DEFAULT_COLOR)


}