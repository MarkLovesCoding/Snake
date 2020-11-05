import { SNAKE_SPEED, snake, draw as drawSnakeBody, update as updateSnakeBody, snakeLead, checkSnakeIntersection} from './snake.js'
import { draw as drawFruit, update as updateFruit} from './fruit.js'
import {checkBoundary} from './grid.js'

 let latestRenderTime = 0;
 let checkGameOver = false;
 const board = document.getElementById('game-box')

function app(time) {

  if (checkGameOver){
    if(confirm("Game Over. Press OK to restart.")){
      window.location='/'
    }
    return
  }


  window.requestAnimationFrame(app)
  const sinceLastRender = (time - latestRenderTime) / 1000;
  if (sinceLastRender < 1 / SNAKE_SPEED) return

  latestRenderTime = time;

  update()
  draw()
}


window.requestAnimationFrame(app)

 function updateBackground(board,snake){
  const countAttribute = document.createAttribute("count")
  countAttribute.value = snake.length;
  board.setAttributeNode(countAttribute);
}



function update(){
  checkConditions()

  updateSnakeBody()
  updateBackground(board,snake)
  updateFruit()
  // styleUpdate()

}

function draw(){
  board.innerHTML = ''
  drawSnakeBody(board)
  drawFruit(board)
}

function checkConditions(){
   checkGameOver = checkBoundary(snakeLead())||checkSnakeIntersection()
}
