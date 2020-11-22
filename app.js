import { SNAKE_SPEED, snake, draw as drawSnakeBody, update as updateSnakeBody, snakeLead, checkSnakeIntersection} from './snake.js'
import { draw as drawFruit, update as updateFruit} from './fruit.js'
import {checkBoundary} from './grid.js'
 let latestRenderTime = 0;
 let checkGameOver = false;


 // let toggle = false;

 const board = document.getElementById('game-box')
 // const menuActive = true;
 // const modal = document.getElementById('modal')
//  const playButton = document.getElementById("play");
//
//
//  playButton.addEventListener("click",(e)=>{
//    toggleModal()
//    toggleStart()
// })


// if(play){
//   window.requestAnimationFrame(app)
// }
//
// if(!play){
//   window.cancelAnimationFrame(app)
// }
  const modalState = document.getElementById("login")

  function app(time) {
    if (checkGameOver){
      if(confirm("Game Over. Press OK to restart.")){
        window.location='/'
      }
      modalState.classList = `${modalState.classList} login-active`;
      console.log(modalState.classList);


      return
    }

    window.requestAnimationFrame(app)
    const sinceLastRender = (time - latestRenderTime) / 1000;
    if (sinceLastRender < 1 / SNAKE_SPEED) return

    latestRenderTime = time;


    update()
    draw()

  }

  // function toggleStart(){
  //   if(!toggle){
  //     toggle = true;
  //     window.requestAnimationFrame(app)
  //
  //   }
  //   else{
  //     toggle = false;
  //     window.cancelAnimationFrame(startId);
  //
  //   }
  // }
  //
  // function toggleModal(){
  //    if(modal.style.visibility == "visible"){
  //       modal.style.visibility = "hidden"
  //       return;
  //    }
  //    else{
  //      modal.style.visibility = "visible";
  //      return;
  //  }
  // }


  window.requestAnimationFrame(app)


 function updateBackground(board,snake){
  const countAttribute = document.createAttribute("count")
  countAttribute.value = snake.length;
  board.setAttributeNode(countAttribute);
  // modal.setAttributeNode(countAttribute)
}



function update(){
  checkConditions()

  updateSnakeBody()
  updateBackground(board,snake)
  updateFruit()

}

function draw(){
  board.innerHTML = ''
  drawSnakeBody(board)
  drawFruit(board)
}

function checkConditions(){
   checkGameOver = checkBoundary(snakeLead())||checkSnakeIntersection()
}
