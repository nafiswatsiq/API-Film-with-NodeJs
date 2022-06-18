const nodemailer = require('nodemailer');
require('dotenv').config()
const {MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_ENCRYPTION, MAIL_FROM_ADDRESS} = process.env;

function verifyEmail(req, res) {
    const email = req.body.email;
    const bodyEmail = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h3>Verifikasi email</h3>
            <p>silahkan klik tautan berikut untuk memverifikasi email</p>
            <a href="https://goggle.com">VERIFIKASI</a>
        </body>
        </html>`
        
    const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure:false,
        requireTLS: MAIL_ENCRYPTION,
        auth: {
          user: MAIL_USERNAME, // enter your email address
          pass: MAIL_PASSWORD  // enter your visible/encripted password
        }
    });

    const mailOptions = {
        from: MAIL_FROM_ADDRESS,
        to: email,
        subject: 'verifikasi',
        html: bodyEmail
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email was sent successfully: ' + info.response);
          res.json({
            status: 200,
            message: 'success send email',
            data: info.response
        })
        }
    });
}

module.exports = {
    verifyEmail
}