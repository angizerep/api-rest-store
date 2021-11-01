'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3001

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la DB: ${err}`)
    }
    console.log('Conectado a la DB correctamente')
    app.listen(port, () => {
        console.log(`API REST conrriendo en http://localhost:${port}`)
    })
})
