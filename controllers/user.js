'use strict'

const User = require('../models/user')
const service = require('../services')

function singUp() {
    const user = new User ({
        name : req.body.name,
        lastname : req.body.lastname,
        displayName : req.body.displayName,
        email : req.body.email,
        avatar = req.body.avatar
    })

    user.save((err) => {
        if (err) return res.status(500).send({message: `Error al registrar el usuario: ${err}`})
        
        res.status(200).send({ token: service.createToken })
    })

}

function singIn (){

}

module.exports = {
    singUp,
    singIn
}
