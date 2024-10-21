const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()

const users = require('./routes/api/users.js')
const dreams = require('./routes/api/dreams.js')
const stories = require('./routes/api/stories.js')
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then((conn) => {
    console.log(`MongoDB  Connected: ${conn.connection.host}`)
}).catch((err) => {
    console.log(`Error: ${err.messaeg}`)
    process.exit(1)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/users', users)
app.use('/api/dreams', dreams)
app.use('/api/stories', stories)

app.get('/', (req, res) => {
    return res.send("Hello World!")
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})