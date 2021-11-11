'use strict'

const express = require('express')
const api = require('./routes/routes')
const app = express()
const hbs = require('express-handlebars')

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api', api)

module.exports = app