"use strict"

const nodemailer = require("nodemailer")
// var emailTemplates = require("email-templates").EmailTemplates
const config = require('../configMail')

const transporter = nodemailer.createTransport( config.development, {
    connectionTimeout: 5 * 60 * 1000, // 5 min
})

function sendMailRegister( email ) {
        let mailOptions = {
            to: email,
            subject: 'Register PRUEBAAA',
            html: "<b>Hello world?</b>",
        }
        transporter.sendMail(mailOptions, function (err,info) {
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log('sendMailRegister Sent')
            }
        })
}

function sendMailChangePassword( email ) {
    let mailOptions = {
        to: email,
        subject: 'Update Password',
        html: "<b>Hello world?</b>",
    }
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('sendMailChangePassword Sent')
        }
    })
}

function sendMailForgotPassword( email, password ) {
    let mailOptions = {
        to: email,
        subject: 'Forgot Password',
        html: "<b>Hello world?</b>",
    }
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('sendMailForgotPassword Sent')
        }
    })
}

function sendMailEditUserInformation( email ) {
    let mailOptions = {
        to: email,
        subject: 'Register PRUEBAAA',
        html: "<b>Hello world?</b>",
    }
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('sendMailEditUserInformation Sent')
        }
    })
}

function sendMailInactivateUser( email ) {
    let mailOptions = {
        to: email,
        subject: 'Register PRUEBAAA',
        html: "<b>Hello world?</b>",
    }
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('sendMailInactivateUser Sent')
        }
    })
}

function sendMailDeleteUser( email ) {
    let mailOptions = {
        to: email,
        subject: 'Register PRUEBAAA',
        html: "<b>Hello world?</b>",
    }
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('sendMailDeleteUser Sent')
        }
    })
}

function sendMailInactivateUser( email ) {
    let mailOptions = {
        to: email,
        subject: 'Inactivate User',
        html: "<b>Hello world?</b>",
    }
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('sendMailInactivateUser Sent')
        }
    })
}

transporter.verify( () => {
    console.log('Ready for send email')
})

module.exports = {
    sendMailRegister,
    sendMailDeleteUser,
    sendMailForgotPassword,
    sendMailChangePassword,
    sendMailInactivateUser,
    sendMailEditUserInformation    
}