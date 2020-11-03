import {expandSnakeBody, isCellOnSnake} from './snake.js'
import {randomPosition} from './grid.js'

let fruit = randomPosition()

const EXPANSION = 1;


export function update(){
  if(isCellOnSnake(fruit)){
    expandSnakeBody(EXPANSION)
    fruit = randomPosition()
  }
}
export function draw(board){
  const fruitEl = document.createElement('div');
  fruitEl.style.gridColumnStart = fruit.x
  fruitEl.style.gridRowStart = fruit.y
  fruitEl.classList.add('fruit');
  board.appendChild(fruitEl)
}

function getRandomFruitPos(){
  let newFruitPos;
  while (newFruitPos === null || isCellOnSnake(newFruitPos)){
    newFruitPos = randomPosition()
  }
  return newFruitPos;
}
