const mongoose = require('mongoose')
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is connected Successfully")
    }
    catch (err){
        console.log("Connection failed!")
        process.exit(1);
    }
}


module.exports = connectDB