const express = require('express')
const app = express()
const PORT = 3000
app.get('/', (req, res)=>{
    res.send('Hello buddy')
})

app.get('/home', (req,res)=>{
    console.log(req)
    console.log(res)
    res.send("Home page")
})

  app.listen(PORT, ()=>{
    console.log(`Sir Server is running on port ${PORT}`)
   })