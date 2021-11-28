'use strict'

const express = require('express')
const api = require('./routes/routes')
const app = express()
const hbs = require('express-handlebars')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Configuración motor de plantilla
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use('/api/v1', api)

app.use('/login', (req, res) => {
    res.render('login')
})

app.use('/products', (req, res) => {
    res.render('product')
})


module.exports = app