if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const app = express()
const validator = require('validator')
const bcrypt = require('bcrypt')
 const passport = require('passport')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local').Strategy;
const initializeDbPassport = require('./passport-db-config.js')
const routes = require('./public/routes/routes.js');

//
  const User = require('./public/models/userSchema')
// console.log(registrySchema)
//
//
//


app.set('view-engine','ejs')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({extended:false}))
// app.use(express.static(process.cwd()+"/views/"))
app.use(express.static(process.cwd()+"/public/"))
app.use(express.static(process.cwd()+"/"))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:false
}))
app.use(flash())

app.use(initializeDbPassport.initialize());
app.use(initializeDbPassport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
})
mongoose.set('useCreateIndex',true)

// var db = mongoose.connection
// db.on('err',console.error.bind(console,'connection error:'))
// db.once('open',()=>{
//   console.log('connection successful');
// })
app.use('/',routes)

  app.listen(3000,()=>{console.log("Server Working")})
