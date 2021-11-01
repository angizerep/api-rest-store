'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.listen(port, () => {
    console.log(`API REST conrriendo en http://localhost:${port}`)
})
