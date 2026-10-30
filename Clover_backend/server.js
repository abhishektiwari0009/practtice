const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
connectDB()
const userRouter = require('./routes/userRoutes')
app.use(express.json())
app.use('/api/v1', userRouter)


app.listen(PORT,()=>{
    console.log(`Sir server is running on ${PORT}`)
})
