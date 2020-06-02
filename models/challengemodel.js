const mongoose = require("mongoose")
const Schema = mongoose.Schema

const challengeSchema = new Schema({
    title: String,
    description: String,
    initiator: {type: Schema.Types.ObjectId, ref:"User"},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    satisfaction: { type: Number, default: 0 },
    likealready: { type: Boolean, default: false },
    dislikealready: { type: Boolean, default: false }
})

const Challenge = mongoose.model("challenges",challengeSchema)

module.exports = Challenge






