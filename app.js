const express = require('express')
const itemRouter = require('./item-routes')

const app = express()

app.use(express.json())
app.use('/items',itemRouter)



app.use((err,req,res,next) => {
    res.status(err.code || 400).json(err.message)
})
module.exports = app

