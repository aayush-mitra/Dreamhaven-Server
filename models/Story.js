const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dreams"
    },
    title: {
        type: String,
    },
    content: {
        type: String
    }
}, {timestamps: true})

const Story = mongoose.model("Stories", StorySchema)

module.exports = Story