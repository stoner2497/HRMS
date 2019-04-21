const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const xoauth2 = require("xoauth2");
const fs = require("fs");

module.exports = mail = (receiver, description, subject) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
          user: "sahilshah22269@gmail.com",
          clientId:
            "870725568586-mlulucu27lksoef40h2pq7u08kk6jk7j.apps.googleusercontent.com",
          clientSecret: "dn2j9FXeHolPamji2ODnUTkq",
          refreshToken: "1/GqGWmcwDxu3q1Sn-TnZPHEcecPpi4FGrYxO4VpMpqzg"
        })
      }
    })
  );
  const mailOptions = {
    from: "Human Resorce Managment <sahilshah22269@gmail.com>",
    to: receiver,
    subject: subject,
    text: description
    // attachment: {
    //   filename: "text4.txt",
    //   content: fs.createReadStream("file.txt")
    // }
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) throw err;
    console.log(`email sent ${res}`);
  });
};
