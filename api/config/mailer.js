const envs = require("./envs");

// Usar SendGrid en producción, Nodemailer en desarrollo
let transporter;

if (process.env.NODE_ENV === "production" && process.env.SENDGRID_API_KEY) {
  // Producción: Usar SendGrid (API HTTP - no bloqueado por Render)
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Adaptar SendGrid para que tenga la misma interfaz que Nodemailer
  transporter = {
    sendMail: async (mailOptions) => {
      const msg = {
        to: mailOptions.to,
        from: mailOptions.from || envs.SMTP_USER,
        subject: mailOptions.subject,
        html: mailOptions.html,
      };
      return sgMail.send(msg);
    },
  };

  console.log("📧 Using SendGrid for emails");
} else {
  // Desarrollo: Usar Nodemailer (SMTP)
  const nodemailer = require("nodemailer");

  transporter = nodemailer.createTransport({
    host: envs.HOST_MAILER,
    port: parseInt(envs.SMTP_PORT),
    secure: envs.SMTP_SECURE,
    auth: {
      user: envs.SMTP_USER,
      pass: envs.SMTP_PASSWORD,
    },
  });

  console.log("📧 Using Nodemailer (SMTP) for emails");
}

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: `Maddison Foo Koch 👻" <${process.env.SMTP_USER}>`, // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
module.exports = { transporter };
