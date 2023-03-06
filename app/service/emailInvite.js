const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user: "getbalanced3@gmail.com",
      pass:"patatecarotte",
    },
    tls:{
      rejectUnauthorized: false,
    }
  });

  let mailOptions = {
    from: "getbalanced3@gmail.com",
    to: "fetra.rabnehasy@gmail.com",
    subject: "test envoi depuis getBalanced",
    text: "premier mail utilisant nodeMailer"
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