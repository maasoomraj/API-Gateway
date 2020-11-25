const express = require('express')
const middleware = require('./Routes/index')
const { dbConnect } = require('./Utils/database')

const app = express()
app.use(express.json())
app.use(middleware)

const PORT = 8002
app.listen(PORT, () => {
    dbConnect()
    console.log(`Listening at port ${PORT}`)
})