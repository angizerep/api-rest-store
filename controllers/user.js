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
    
    let isEqual = false;

    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            console.log('userFound ', userFound)

            UserPasswordHistory.find({ 
                user: userFound._id
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {


                }
            })
        }
    })
}

function inactivateUser ( req, res ){
    
    let isEqual = false;

    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            console.log('userFound ', userFound)

            UserPasswordHistory.find({ 
                user: userFound._id
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {

                }
            })
        }
    })
}

function deleteUser ( req, res ){
    
    let isEqual = false;

    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            console.log('userFound ', userFound)

            UserPasswordHistory.find({ 
                user: userFound._id
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {

                    let userPassword = '$2a$10$6YrIcYuwV1dBWIiB/Em3WOzFVBlxAQGhxhjjqZ6CdUgmDs5s42K72' //req.body.password
                    console.log('userPassword ',userPassword)


                    console.log('userPasswordFound ', userPasswordFound)
                    console.log('userPasswordFound leng ', userPasswordFound.lenght)

                    async.mapSeries( userPasswordFound, function(element , callback){
                        console.log('element ',element)
                        bcrypt.compare(req.body.password, element.password, function(err, resp) {
                            // if (err){
                            //     console.log('ERR Primero')
                            //     res.status(404).send({message: 'passwords do not match'})
                            // }
                            if (resp){
                              // Send JWT
                                console.log('IF ', resp)
                                // res.status(200).send({
                                //     message: 'Te has logueado correctamente',
                                //     token: service.createToken(userFound)
                                // })
                                isEqual = true;
                                return callback;
                            } else {
                                isEqual = false;
                                console.log('Else ', resp)
                                console.log('Error ', err)
                                return callback;
                                // res.status(404).send({message: 'passwords do not match'})
                            }
                        });
                    } )

                    if (callback){
                        if ( isEqual === true ) {
                            res.status(404).send({message: 'MAL'})
                        }
                        else{
                            console.log('Todo normal')
                            res.status(200).send({message: 'BIEEEN'})
                        }
                    }
                }
            })
        }
    })
}

module.exports = {
    changePassword,
    singUp,
    singIn,
    inactivateUser,
    deleteUser
}
