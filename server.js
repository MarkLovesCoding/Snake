if (process.env.NODE_ENV != 'production'){
  require('dot-env').config
}

const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email)
)
const users = []

app.use(express.urlencoded({extended:false}))
app.use(express.static(process.cwd()+"/public/"))
app.use(express.static(process.cwd()+"/"))

app.use(flash())
app.use(session({
  secret: "hi",
  resave: false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session())
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})
app.get("/login",(req,res)=>{
  res.sendFile(__dirname+"/login.html")
})
app.post('/login',checkNotAuthenticated,passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true
}))
app.get("/register",(req,res)=>{
  res.sendFile(__dirname+"/register.html")
})
app.post('/register',checkNotAuthenticated, async (req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    users.push({
      id:Date.now().toString(),
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword
    })
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout',(req,res)=>{
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
})
function checkNotAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

function checkAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return res.redirect('/')
  }
}
app.listen(3000,()=>{console.log("Server Working")})
