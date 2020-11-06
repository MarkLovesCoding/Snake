import { getDirection } from './userInput.js';

export const SNAKE_SPEED = 10;

export const snake = [
  {x:15,y:15}
]

let newSnakePieces = 0;

//=====================
//Updates snake on board
// - add new pieces
// - get input direction
// - update lead piece and
//=====================
 export function update(){
   addPieces()

   const direction = getDirection()

   snake.unshift({...snake[0]})
   snake[0].x += direction.x;
   snake[0].y += direction.y;
   snake.pop();



 }
 //=====================
 //Draws snake on board
 //=====================
  export function draw(board){
     const direction = getDirection()
      snake.forEach((gridPiece, index, array) => {
        const el = document.createElement('div');
        el.style.gridColumnStart = gridPiece.x;
        el.style.gridRowStart = gridPiece.y;
        el.classList.add('snake');

        //update border radius of snake head based on direction
        styleUpdate(el, direction, index)

        board.appendChild(el);
      })
  }

  //=====================
  //Expands snake by amount -- expansion amount
  //=====================
 export function expandSnakeBody(amount){
   newSnakePieces += amount
 }

 //=====================
 //Checks if grid cell is on snake cell
 //=====================
 export function isCellOnSnake(checkPosition,{ ignoreFirstPiece = false } = {}){
   return snake.some((snakePosition,index)=>{
     if(ignoreFirstPiece && index === 0) return false
     return equalPositions(snakePosition,checkPosition)
   })
 }

//=====================
//Snake Lead Piece
//=====================
 export function snakeLead(){
   return snake[0]
 }

 //=====================
 //Check if snake lead piece intersects with fruit
 //=====================
 export function checkSnakeIntersection(){
   return isCellOnSnake(snake[0],{ignoreFirstPiece:true})
 }

 //=====================
 //Snake Lead Piece
 //=====================
function equalPositions(el, pos){
  return (el.x === pos.x && el.y ===pos.y)
}

//=====================
//Add newSnakePieces to length of snake
//=====================
function addPieces(){
  for(let i=0; i< newSnakePieces; i++){
    snake.push({...snake[snake.length - 1]})
  }
  newSnakePieces = 0;
  return
}
//=====================
//Style snake-border head and tail
//=====================
  function styleUpdate(el, direction, index){


    var eye1 = document.createElement("div")
    var eye2 = document.createElement("div")
    var tongue = document.createElement("tongue")
    eye1.setAttribute("class","eye1")
    eye2.setAttribute("class","eye2")
    tongue.setAttribute("class","tongue")
    if (index == 0){
    el.appendChild(eye1)
    el.appendChild(eye2)

    el.appendChild(tongue)}
   if(index == 0){
     if(direction.x == 0 && direction.y == 0){

       el.style.borderBottomRightRadius = "50%";
       el.style.borderTopRightRadius = "50%";
       el.style.borderBottomLeftRadius = "50%";
       el.style.borderTopLeftRadius = "50%";
     }
   else{
     console.log(direction.x, direction.y)
     switch (direction.x) {
       case (1):

       eye1.setAttribute("class","eye1-horizontal")
       eye2.setAttribute("class","eye2-horizontal")
             tongue.setAttribute("class","tongue-right")
             el.style.borderBottomRightRadius = "50%";
             el.style.borderTopRightRadius = "50%";
         break;
       case (-1):
       eye1.setAttribute("class","eye1-horizontal")
       eye2.setAttribute("class","eye2-horizontal")
       tongue.setAttribute("class","tongue-left")
             el.style.borderTopLeftRadius = "50%";
             el.style.borderBottomLeftRadius = "50%";
         break;

       }
       switch (direction.y) {
       case (-1):
       eye1.setAttribute("class","eye1")
       eye2.setAttribute("class","eye2")
              tongue.setAttribute("class","tongue-top")
             el.style.borderTopLeftRadius = "50%";
             el.style.borderTopRightRadius = "50%";
         break;
       case (1):
       eye1.setAttribute("class","eye1")
       eye2.setAttribute("class","eye2")
       tongue.setAttribute("class","tongue")
             el.style.borderBottomLeftRadius = "50%";
             el.style.borderBottomRightRadius = "50%";
         break;

     }
   }
 }
}
