const express = require('express')
const app = express()
app.use(express.json());
require('dotenv').config()
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose");


app.get('/', (req,res)=>{
    res.send("hello world")
})


const connections = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/CloverKingdom')
        console.log("mongodb is connected successfully")
    }
    catch(err){
        console.log("connection failed")
        process.exit(1)
    }
}
connections()
let userSchema = mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    age: Number,
    password: String,
})



let user = mongoose.model('user', userSchema)

app.post('/createuser', async(req, res)=>{
    await user.create(req.body)
    res.status(201).send({body: "user created successfully"})
})

app.get('/getalluser', async(req,res)=>{
    let data = await user.find()
    res.status(200).send(data)

})

app.get('/getuser/:id', async(req,res)=>{
    let data = await user.findById(req.params.id)
    res.status(200).send(data)
})



app.listen(PORT, ()=>{
    console.log(`Sir Server is running on ${PORT}`)
})

