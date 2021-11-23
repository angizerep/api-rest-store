'use strict'

const User = require('../models/user')
const service = require('../services')
const UserPasswordHistory = require('../models/userPasswordHistory')
var transporter = require('../helpers/mailer')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const async = require('async')

function singUp( req, res ) {
    console.log('Estoy en singUp')
    const user = new User ({
        name : req.body.name,
        lastname : req.body.lastname,
        displayName : req.body.displayName,
        email : req.body.email,
        avatar : req.body.avatar,
        // password : req.body.password
    })

    user.save((err, userSaved) => {
        if (err) {
            return res.status(500).send({message: `Error al registrar el usuario: ${err}`})
        }
        else{
            try {
                console.log('Guardó el usuario')
                const userPassword = new UserPasswordHistory ({
                    user : userSaved,
                    password : req.body.password //userSaved.password
                })
                userPassword.save((err, userPassword) => {
                    if (err) {
                        return res.status(500).send({message: `Error al registrar el usuario: ${err}`})
                    }
                    else{
                        res.status(200).send({ userPassword })
                        transporter.sendMailRegister( userSaved.email );
                    }
                })
            } catch (err) {
                return res.status(400).send({message: err })
            }
        }
    })
}

function singIn ( req, res ){
    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            UserPasswordHistory.find({ 
                user: userFound.email,
                status : true 
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {
                    bcrypt.compare(req.body.password, userFound.password, function(err, resp) {
                        if (err){
                            res.status(404).send({message: 'passwords do not match'})
                        }
                        if (resp){
                          // Send JWT
                            res.status(200).send({
                                message: 'Te has logueado correctamente',
                                token: service.createToken(userFound)
                            })
                        } else {
                            res.status(404).send({message: 'passwords do not match'})
                        }
                    });
                }
            })
        }
    })
}

function changePassword ( req, res ){
    
    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            UserPasswordHistory.find({ 
                user: userFound.email,
                status : true 
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {
                    async.mapSeries( userPasswordFound, function(element , callback){
                        bcrypt.compare(req.body.password, element, function(err, resp) {
                            if (err){
                                res.status(404).send({message: 'passwords do not match'})
                            }
                            if (resp){
                                break;
                            } else {
                                res.status(404).send({message: 'passwords do not match'})
                            }
                        });
                    } )
                }
            })
        }
    })
}

module.exports = {

    singUp,
    singIn
}
