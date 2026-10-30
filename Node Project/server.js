const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const {connect, connection} = require("mongoose");
app.get('/', (req, res)=>{
    res.send('Hello buddy')
})
const connections = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/faltu')
        console.log("mongodb is connected successfully")
    }
    catch(err){
        console.log("connection failed")
        process.exit(1)
    }
}
connections()

let studentSchema = mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
})

let studentmodel = mongoose.model('student', studentSchema)

studentmodel.create({
    name: 'john',
    email: 'john@gmail.com',
    contact: 1234567899,
})


  app.listen(PORT, ()=>{
    console.log(`Sir Server is running on port ${PORT}`)
   })

