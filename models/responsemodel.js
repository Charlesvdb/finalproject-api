const mongoose = require("mongoose")
const Schema = mongoose.Schema

const responseSchema = new Schema({
    caption: String,
    file: String,
    challenger: {type: Schema.Types.ObjectId, ref: "User"},
    challenge: {type: Schema.Types.ObjectId, ref: "Challenge"}
})

const Response = mongoose.model("response",responseSchema)

module.exports = Response




