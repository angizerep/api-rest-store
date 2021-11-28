'use strict'

const User = require('../models/user')
const service = require('../services')
const UserPasswordHistory = require('../models/userPasswordHistory')
var transporter = require('../helpers/mailer')

function saveUserPasswordHistory( req, res ) {
    console.log('Estoy en savePassword')
    const user = new UserPassword ({
        user : req.user,
        password : req.password
    })

    user.save((err, userSaved) => {
        if (err) {
            return res.status(500).send({message: `Error al registrar el usuario: ${err}`})
        }
        
        else{
            try {
                res.status(200).send({ userSaved })
                transporter.sendMailRegister( userSaved.email )
            } catch (err) {
                return res.status(400).send({message: err })
            }
        }
    })
}


module.exports = {
    savePasswordHistory
}
