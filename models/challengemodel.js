const mongoose = require("mongoose")
const Schema = mongoose.Schema

const challengeSchema = new Schema({
    title: String,
    description: String,
    initiator: {type: Schema.Types.ObjectId, ref:"User"}
})

const Challenge = mongoose.model("challenges",challengeSchema)

module.exports = Challenge






