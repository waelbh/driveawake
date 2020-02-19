const functions = require('firebase-functions');
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
admin.initializeApp()
//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'embeddedmajesty@gmail.com',
        pass: 'EmbeddedMajesty2019'
    }
});
exports.sendEmaill = functions.firestore
    .document('User/{UserId}')
    .onCreate((snap, context) => {
        const mailOptions = {
            from: `embeddedmajesty@gmail.com`,
            to: snap.data().email,
            subject: 'Welcome To Drive Awake ',
            html: `<h1>Drive Awake dashboard Access</h1>
                                <p>
                                   <strong>You can now login to Your dashboard account and benefits of our services</strong>
                                   <br>
                                   <b>Email: </b>${snap.data().email}<br><b>password: </b>${snap.data().password}<br>
                                </p>`
        };
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });

    exports.sendEmailOnUpdate = functions.firestore
    .document('User/{UserId}')
    .onUpdate((snap, context) => {
        const mailOptions = {
            from: `embeddedmajesty@gmail.com`,
            to: snap.after.data().email,
            subject: ' Drive Awake Alert ',
            html: `<h1>Drive Awake dashboard Access</h1>
                                <p>
                                   <strong>Your personal Account information has been changed</strong>
                                   <br>
                                   <b>Email: </b>${snap.after.data().email}<br><b>password: </b>${snap.after.data().password}<br>
                                </p>`
        };
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });