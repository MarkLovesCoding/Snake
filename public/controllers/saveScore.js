const User = require('../models/userSchema')
// const {highScore,activeUser} = require('../routes/routes.js')
function(newScore){
  let doc = User.findOneAndUpdate({username:activeUser},{highScore:highScore},{new:true})

}
