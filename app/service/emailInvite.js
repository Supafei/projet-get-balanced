const nodemailer = require("nodemailer");
const nodeoutlook = require('nodejs-nodemailer-outlook');
const dataMapper = require("../datamapper");


const emailInvite = {
    // async..await is not allowed in global scope, must use a wrapper
    async sendMail(receiverEmail, senderFirstName, senderLastName, plannerId, emailContent) {

      try {

        let getPlanner = await dataMapper.getOneById("planner", "id", plannerId);
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp-mail.outlook.com",
          secureConnection: false,
          port: 587,
          tls: {
            ciphers: "SSLv3"
          },
          auth: {
            user: process.ENV.USERMAIL,
            pass: process.ENV.PASSWORDMAIL
          }
        });

        let mailOptions = {
          from: process.ENV.USERMAIL,
          to: receiverEmail,
          subject: "Venez prendre votre part",
          text: `${emailContent}`
        }



        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions, function (err, success) {
          if (err) {
            console.log(err)

          } else {
            console.log("L'envoi de l'email a été effectué avec succès!");
          }
        });

        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      } catch (error) {

        console.log(error);
      }
    }
  }

  module.exports = emailInvite;