const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    location: String,
    imageUrl: String,
    friends: [String],
    error: String
})

const User = mongoose.model("users",userSchema)

module.exports = User;