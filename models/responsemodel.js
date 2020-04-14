const mongoose = require("mongoose")
const Schema = mongoose.Schema
import { ObjectId } from "mongoose"

const responseSchema = new Schema({
    title: String,
    photo: String,
    challenger: {type: ObjectId, ref: "User"},
    challenge: {type: ObjectId, ref: "Challenge"}
})

const Response = mongoose.model("response",responseSchema)

module.exports = Response




