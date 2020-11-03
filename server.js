const express = require('express');
const app = express()
const cors = require('cors');
app.use(cors())

app.use(express.static(process.cwd+"/"))
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})
app.listen(3000,()=>console.log("Server Working"))
