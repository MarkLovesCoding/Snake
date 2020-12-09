const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

 const { Schema } = mongoose;

  const userSchema = Schema({
   name:  {
      type:String,
      required:[true,"name is required"],
      unique:true
    }, // String is shorthand for {type: String}
   // email: {
   //    type:String
   //    // required:[true,"email is required"],
   //    // validate:[validator.isEmail,"Please provide valid email address"],
   //
   //    },
   // password:   {
   //      type:String,
   //      required:[true,"password is required"]
   //    },
   highScore: {type:Number,default:0},
   timesLoggedIn: {type:Number,default:0}
 })
// })

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',userSchema)
