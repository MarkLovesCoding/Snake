const passport = require('passport');
const express = require('express');

const User = require('../models/userSchema')
const router = express.Router()

let currentUser = "";
let currentUserHighScore = 1;


  router.get("/",checkAuthenticated, async(req,res)=>{
  var highScoreLeaders;
  var leaderBoardScores;
  await User.find({highScore:{$gte:1}}).sort({highScore: -1}).limit(5).then((data)=>{
    highScoreLeaders = data.map((d)=>{
      return d.username;
    })
    leaderBoardScores = data.map((d)=>{
      return d.highScore;
    })

  })
    res.render(process.cwd()+"/public/views/index.ejs", { highScore: currentUserHighScore,
      username:currentUser,
      leader1:highScoreLeaders[0],score1:leaderBoardScores[0],
      leader2:highScoreLeaders[1],score2:leaderBoardScores[1],
      leader3:highScoreLeaders[2],score3:leaderBoardScores[2],
      leader4:highScoreLeaders[3],score4:leaderBoardScores[3],
      leader5:highScoreLeaders[4],score5:leaderBoardScores[4],
    })
  })


  //==========================================
  //
  //  Update DB on gameover.
  //
  //==========================================


  router.post("/save", async(req,res)=>{
    currentUser = req.body.username;
    currentUserHighScore = req.body.highScore

     await User.findOneAndUpdate({username:currentUser},{highScore:currentUserHighScore},{new:true, useFindAndModify:false},(err,data)=>{
      if(err){
        console.log("update err");
      }
      return data
    })
     await User.find({highScore:{$gte:1}}).sort({highScore: -1}).limit(5).then((data)=>{
       highScoreLeaders = data.map((d)=>{
       return d.username;
     })

   }).catch((err)=>{
     console.log("leaderboard error");
   })
       res.redirect('/');
  })
//   router.get("/save",async (req,res)=>{
//     console.log("5herehere",currentUser);
//     await User.findOne({username:currentUser},(err,data)=>{
// console.log("6data"+data);
//       return data
//     })
//     // res.render(process.cwd()+"/public/views/index.ejs", { highScore: req.body.highScore, username:req.body.username})
//       res.redirect('/');
//      // res.render(process.cwd()+"/public/views/index.ejs", { highScore: req.body.highScore, username:req.body.username})
//   })




  router.get("/login",(req,res)=>{
    res.render(process.cwd()+'/public/views/login.ejs',{displayMessage:"LOGIN to play SNEK!"}  )

  })
  router.post('/login',loginMiddleware,

  passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
  })
  )

  router.get("/register",(req,res)=>{
      res.render(process.cwd()+'/public/views/register.ejs',{displayMessage:"REGISTER"})
  })
  router.post('/register', function (req,res,next){

    User.register(new User({username: req.body.username}), req.body.password, function(err) {
      console.log(req.body.username, req.body.password);
    if (err) {
      let errMessage = err.message
        res.render(process.cwd()+'/public/views/register.ejs',{displayMessage:errMessage})
      return next(err);
    }
    console.log('user registered!');
    res.render(process.cwd()+'/public/views/login.ejs',{displayMessage:"User Registered. Please Login"})
    // res.redirect('/');
  });

  })

  router.get('/logout',async(req,res)=>{
  await  req.logOut()
    res.redirect('/login')
  })


  function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
  }

  async function loginMiddleware(req,res,next){
    await User.findOneAndUpdate( { username:req.body.username}, {$inc: { timesLoggedIn:0.5 } }, {useFindAndModify:false},(err,doc)=>{
      if(err ||res.status == 405) {
        res.render(process.cwd()+'/public/views/login.ejs',{displayMessage:err.message})
        return next(err)
      };

      if(!doc){
        res.render(process.cwd()+'/public/views/login.ejs',{displayMessage:"no user found"})
        return next()
      }
      currentUser = doc.username;
      currentUserHighScore = doc.highScore;
      next()
    })
  }

module.exports = {router}
