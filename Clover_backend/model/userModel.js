const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    age: Number,
    password: String,
})
const user = mongoose.model('User', userSchema)
module.exports = user;