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
        default: 'N/A'
    },
    endTime: {
        type: String,
        default: 'N/A'
    },
    dreamLength: {
        type: String,
        default: 'N/A'
    },
    lucidity: {
        type: String,
        default: 'N/A'
    },
    mood: {
        type: String,
        default: 'N/A'
    },
    vividness: {
        type: String,
        default: 'N/A'
    },
    characters: {
        type: String,
        default: 'N/A'
    },
    location: {
        type: String,
        default: 'N/A'
    },
    themes: {
        type: String,
        default: 'N/A'
    },
    repetition: {
        type: String,
        default: 'N/A'
    },
    quality: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Dream = mongoose.model("Dreams", DreamSchema)

module.exports = Dream