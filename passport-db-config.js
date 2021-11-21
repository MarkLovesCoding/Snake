const passport = require('passport');
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const User = require('./public/models/userSchema')
const passportLocalMongoose = require('passport-local-mongoose')



  passport.use(new LocalStrategy( (name,password,done) =>{

     User.findOne({ name: name }, function (err, user) {
    console.log('User '+ name +' attempted to log in.');
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
    return done(null, user);
  });
}
  ))
  passport.serializeUser((user,done)=>{
    done(null, user.id)
  })

  passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
      if (err){  done(null, doc);}
    });
  })

module.exports = passport
