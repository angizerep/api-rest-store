'use strict'

const User = require('../models/user')
const service = require('../services')
var transporter = require('../helpers/mailer')

function singUp( req, res ) {
    console.log('Estoy en singUp')
    const user = new User ({
        name : req.body.name,
        lastname : req.body.lastname,
        displayName : req.body.displayName,
        email : req.body.email,
        avatar : req.body.avatar,
        password : req.body.password
    })

    user.save((err, userSaved) => {
        if (err) {
            return res.status(500).send({message: `Error al registrar el usuario: ${err}`})
        }
        
        else{
            try {
                res.status(200).send({ userSaved })
                transporter.sendMailRegister( userSaved.email );
            } catch (err) {
                return res.status(400).send({message: err })
            }
        }
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
