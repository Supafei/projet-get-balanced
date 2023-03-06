const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "24677181c30c34",
      pass: "a973e4594747ce"
    }
  });

  let mailOptions = {
    from: "getbalanced3@gmail.com",
    to: "fetra.rabehasy@gmail.com",
    subject: "test envoi depuis getBalanced",
    text: "Regarde Barbara, ça fonctionne!!!"
  }

 

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, function(err, success) {
    if(err){
      console.log(err)

    } else {
      console.log("L'envoi de l'email a été effectué avec succès!");
    }
  }
);

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);