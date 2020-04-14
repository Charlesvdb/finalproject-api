const mongoose = require("mongoose")
const Schema = mongoose.Schema
import { ObjectId } from "mongoose"

const challengeSchema = new Schema({
    title: String,
    description: String,
    initiator: {type: ObjectId, ref:"User"}
})

const Challenge = mongoose.model("challenge",challengeSchema)

module.exports = Challenge






