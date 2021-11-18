"use strict";

const nodemailer = require("nodemailer");
var emailTemplates = require("email-templates").EmailTemplates

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'devcode18@gmail.com',
        pass: 'iaikiangoapzbdgq',
    },
    connectionTimeout: 5 * 60 * 1000, // 5 min
});

function sendMailRegister( email ) {

    console.log('ESTOY EN sendMailRegister')

    var template = new emailTemplates('../emailTemplate/register')

    template.render( params, function (ee, res) {

        console.log('ESTOY EN RENDER')

        if (err) {
            console.log('ESTOY EN EL PRIMER ERROR')
            return console.error(err)
        }

        let mailOptions = {
            from: 'devcode18@gmail.com',
            to: email,
            subject: 'Register PRUEBAAA',
            html: res.html,
        };
        transporter.sendMail(mailOptions, function (err,info) {
            if(err)
            {
                console.log('ESTOY EN 2do error')

                console.log(err);
            }
        });
    })
}

transporter.verify( () => {
    console.log('Ready for send email')
})

module.exports = {
    sendMailRegister
}