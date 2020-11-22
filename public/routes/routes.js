const passport = require('passport');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema')
const router = express.Router()
const mongoose = require('mongoose')
// const validator = require('validator')

  router.get("/",checkAuthenticated,(req,res)=>{
    res.sendFile(process.cwd()+"/public/views/index.html")
    // res.render('index.ejs',{name:req.user.name})
  })
  router.get("/login",checkNotAuthenticated,(req,res)=>{
    res.render(process.cwd()+'/public/views/login.ejs')

  })
  router.post('/login',checkNotAuthenticated,passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
  }))
  router.get("/register",(req,res)=>{
      res.render(process.cwd()+'/public/views/register.ejs')
  })
  router.post('/register',checkNotAuthenticated,  function (req,res,err){

    User.register(new User({username: req.body.name}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });

     //  const hashedPassword =  await bcrypt.hash(req.body.password,10)
     //  console.log(hashedPassword);
     //  let user =  await new User({
     //   name:req.body.name,
     //   email:req.body.email,
     //   password: hashedPassword,
     //   date: Date.now(),
     //   highScore:0,
     //   timesLoggedIn:0
     // })

// user.save().then((err,user)=>{
//
//     if(err){
//       console.log("Error saving.");
//       res.redirect('/register') }
//       else{res.send("UserAddedSuccessfully")}
//     res.redirect("/login")
//   }).catch((err)=>{
//       console.log(err);
//       res.redirect('/register')
//     })

  })

  router.delete('/logout',(req,res)=>{
    req.logOut()

    //#######
    //change outcome

    res.redirect('/login')
  })
  function checkNotAuthenticated(req,res,next){
    if (req.isAuthenticated()){

      //#######
      //hide modal
      //redo below

      return res.redirect('/')
    }
    next()
  }

  function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()){
      return next()
    }


    res.redirect('/login')
  }

module.exports = router;
