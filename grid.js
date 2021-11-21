

const GRID_SIZE = 30;

export function randomPosition (){
  return{
    x: Math.floor(Math.random()*(GRID_SIZE)+1) ,
    y: Math.floor(Math.random()*(GRID_SIZE)+1)
  }
}

// CHECK IF POSITION HITS GRID BOUNDARY
export function checkBoundary(position){
  return (
    position.x < 1 || position.x > (GRID_SIZE ) ||
    position.y < 1 || position.y > (GRID_SIZE )
  )
}
