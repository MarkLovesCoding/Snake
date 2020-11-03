import { getDirection } from './userInput.js';

export const SNAKE_SPEED = 10;

const snake = [
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
      snake.forEach(gridPiece => {
        const el = document.createElement('div');
        el.style.gridColumnStart = gridPiece.x;
        el.style.gridRowStart = gridPiece.y;
        el.classList.add('snake')
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
// export function styleUpdate(){
//   let firstSegment = document.getElementsByClassName("snake");
//   // console.log(firstSegment[0]);
//   // firstSegment.style.borderRadius = "5px"
// }
