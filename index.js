'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la DB: ${err}`)
    }
    console.log('Conectado a la DB correctamente')
    app.listen( config.port, () => {
        console.log(`API REST conrriendo en http://localhost:${config.port}`)
    })
})
