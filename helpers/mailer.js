"use strict";

const nodemailer = require("nodemailer");

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
    let mailOptions = {
        from: 'devcode18@gmail.com',
        to: email,
        subject: 'Register PRUEBAAA' ,
        html: "<b>Hello world?</b>"
    };
    transporter.sendMail(mailOptions, function (err,info) {
        if(err)
        {
            console.log(err);
        }
    });
}

transporter.verify( () => {
    console.log('Ready for send email')
})

module.exports = {
    sendMailRegister
}