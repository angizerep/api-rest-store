'use strict'

const User = require('../models/user')
const service = require('../services')
const UserPasswordHistory = require('../models/userPasswordHistory')
var transporter = require('../helpers/mailer')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const async = require('async')

function singUp( req, res ) {
    console.log('SingUp')
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
                        transporter.sendMailRegister( userSaved.email )
                    }
                })
            } catch (err) {
                return res.status(400).send({message: err })
            }
        }
    })
}

function singIn ( req, res ){
    console.log('ACA ')
    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            console.log('ACA ')
            UserPasswordHistory.find({ 
                user: userFound._id,
                status : true 
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {
                    bcrypt.compare(req.body.password, userPasswordFound[0].password, function(err, resp) {
                        // if (err){
                        //     res.status(404).send({message: 'passwords do not match'})
                        // }
                        if (resp){
                          // Send JWT
                            res.status(200).send({
                                message: 'Te has logueado correctamente',
                                token: service.createToken(userFound)
                            })
                        } else {
                            res.status(404).send({message: 'passwords do not match'})
                        }
                    })
                }
            })
        }
    })
}

function changePassword ( req, res ){

    let isEqual = false

    User.findOne({ email: req.body.email }, (err, userFound) => { 
        if (err) return res.status(500).send({message: err})
        if (!userFound) return res.status(404).send({message: 'No existe el usuario'})
        else {
            UserPasswordHistory.find({ 
                user: userFound._id
            }, (err, userPasswordFound) => { 
                if (err) return res.status(500).send({message: err})
                if (!userPasswordFound) return res.status(404).send({message: 'No existe el usuario'})
                else {
                    // var size = Object.keys(userPasswordFound).length;
                    async.mapSeries(userPasswordFound, function (element, callback) {
                        if ( isEqual === false ){
                            bcrypt.compare(req.body.password, element.password, function(err, resp) {
                                try {
                                    if (resp){
                                        isEqual = true
                                        res.status(404).send({message: 'The password cannot be the same as the one used the last 5 times'})
                                    }else {
                                        isEqual = false
                                        callback()
                                    }
                                } catch (err) {
                                    if (err) return res.status(500).send({message: err})
                                }
                            })
                        }
                        else{
                            callback()
                        }
                    }, function() {
                        if ( isEqual === false ){
                            deactivateOldPassword( userPasswordFound, function(cb, err) {
                                if ( cb ){
                                    deleteOldPassword( userPasswordFound, function(cb, err) {
                                        if ( cb ){
                                            saveNewPassword( userFound, req.body.password, function(cb, err) {
                                                if ( cb ){
                                                    res.status(200).send({ cb })
                                                    transporter.sendMailChangePassword( userFound.email )
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function deactivateOldPassword ( userPasswordList, cb ){
    console.log('deactivateOldPassword')
    async.mapSeries(userPasswordList, function (element, callback) {
        UserPasswordHistory.findByIdAndUpdate( element._id , {
            active: false
        }, {new : true},function(err, userPasswordHistoryUpdated) {
            if (err){
                console.log('ERROR')
                res.status(400).json(err)
            }
            else if (!userPasswordHistoryUpdated){
                console.log('ELSE IF')
                res.status(404).send()
            }
            else{
                console.log('ELSE')
                callback()
            }
        })
    }, function() {
            cb('VALE')
    })
}

function deleteOldPassword ( userPasswordList, cb ){
    console.log('deleteOldPassword')
    
    if ( userPasswordList.length > 4 ){
        console.log('deleteOldPassword')

        let userPasswordID = userPasswordList[0]._id

        UserPasswordHistory.findById( userPasswordID, (err, userPassword) => {
            if (err) return res.status(500).send({message: `Error a buscar el password: ${err}`})
            if (!userPassword) return res.status(404).send({message: `El password no existe`})
            
            userPassword.remove( err => {
                if (err) return res.status(500).send({message: `Error al password: ${err}`})
                else{
                    cb('VALE')
                }
            })
        })
    }
    else{
        cb('VALE')
    }
}

function saveNewPassword ( user, password, cb ){
    console.log('saveNewPassword')

    const userPassword = new UserPasswordHistory ({
        user : user,
        password : password
    })
    userPassword.save((err, userPassword) => {
        if (err) {
            return res.status(500).send({message: `Error al guardar la contraseña del usuario: ${err}`})
        }
        else{
            cb(userPassword)
        }
    })
}

function inactivateUser ( req, res ){
    
    let isEqual = false

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
    
    let isEqual = false

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
                                isEqual = true
                                return callback
                            } else {
                                isEqual = false
                                console.log('Else ', resp)
                                console.log('Error ', err)
                                return callback
                                // res.status(404).send({message: 'passwords do not match'})
                            }
                        })
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
