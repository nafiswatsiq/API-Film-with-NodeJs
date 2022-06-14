const nodemailer = require('nodemailer');

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
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure:false,
        requireTLS:true,
        auth: {
          user: '00e3a08dd4e52a', // enter your email address
          pass: '1ccb9ae5a6c64d'  // enter your visible/encripted password
        }
    });

    const mailOptions = {
        from: 'nwcorp@gmail.com',
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