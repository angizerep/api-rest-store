'use strict'

const User = require('../models/user')
const service = require('../services')

function singUp( req, res ) {
    const user = new User ({
        name : req.body.name,
        lastname : req.body.lastname,
        displayName : req.body.displayName,
        email : req.body.email,
        avatar : req.body.avatar,
        password : req.body.password
    })

    user.save((err) => {
        if (err) return res.status(500).send({message: `Error al registrar el usuario: ${err}`})
        
        res.status(200).send({ token: service.createToken })
    })

}

function singIn ( req, res ){
    User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({message: err})
        if (!user) return res.status(404).send({message: 'No existe el usuario'})

        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    }) 
}

module.exports = {
    singUp,
    singIn
}
