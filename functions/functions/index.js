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
exports.sendEmail = functions.firestore
    .document('Company/{CompanyId}')
    .onCreate((snap, context) => {
        const mailOptions = {
            from: `embeddedmajesty@gmail.com`,
            to: snap.data().email,
            subject: 'Welcome To Drive Awake '+snap.data().name,
            html: `<h1>Order Confirmation</h1>
                                <p>
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