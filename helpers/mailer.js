"use strict";

const nodemailer = require("nodemailer");
var emailTemplates = require("email-templates").EmailTemplates
const config = require('../configMail')

const transporter = nodemailer.createTransport( config.development, {
    connectionTimeout: 5 * 60 * 1000, // 5 min
});

function sendMailRegister( email ) {

    // var template = new emailTemplates('../emailTemplate/register')
    // template.render( params, function (ee, res) {

        // if (err) {
        //     console.log('ESTOY EN EL PRIMER ERROR')
        //     return console.error(err)
        // }

        let mailOptions = {
            to: email,
            subject: 'Register PRUEBAAA',
            html: "<b>Hello world?</b>",
        };
        transporter.sendMail(mailOptions, function (err,info) {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log('sendMailRegister Sent')
            }
        });
    // })
}

transporter.verify( () => {
    console.log('Ready for send email')
})

module.exports = {
    sendMailRegister
}