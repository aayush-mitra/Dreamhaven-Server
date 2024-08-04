const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.get('/', (req, res) => {
    return res.send("Hello World!")
})

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})