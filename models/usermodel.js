const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    location: String,
    file: String
})

const User = mongoose.model("users",userSchema)

module.exports = User;