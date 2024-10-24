const mongoose = require('mongoose')

const DreamSchema = new mongoose.Schema({
    dateString: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    startTime: {
        type: String,
        default: ''
    },
    endTime: {
        type: String,
        default: ''
    },
    dreamLength: {
        type: String,
        default: ''
    },
    lucidity: {
        type: String,
        default: ''
    },
    mood: {
        type: String,
        default: ''
    },
    vividness: {
        type: String,
        default: ''
    },
    characters: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    themes: {
        type: String,
        default: ''
    },
    repetition: {
        type: String,
        default: ''
    },
    quality: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Dream = mongoose.model("Dreams", DreamSchema)

module.exports = Dream