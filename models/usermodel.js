const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    location: String,
    imageUrl: String,
    friends: [mongoose.Schema.Types.ObjectId],
    error: String
})

const User = mongoose.model("users",userSchema)

module.exports = User;