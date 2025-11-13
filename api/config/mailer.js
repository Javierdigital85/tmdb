const envs = require("./envs");

// Usar Resend en producción, Nodemailer en desarrollo
let transporter;

// DEBUG: Ver valores de las variables de entorno
console.log("🔍 DEBUG - NODE_ENV:", process.env.NODE_ENV);
console.log("🔍 DEBUG - RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
console.log(
  "🔍 DEBUG - RESEND_API_KEY value:",
  process.env.RESEND_API_KEY ? "SET" : "NOT SET"
);

if (process.env.NODE_ENV === "production" && process.env.RESEND_API_KEY) {
  // Producción: Usar Resend (API HTTP - no bloqueado por Render)
  const { Resend } = require("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Adaptar Resend para que tenga la misma interfaz que Nodemailer
  transporter = {
    sendMail: async (mailOptions) => {
      const result = await resend.emails.send({
        from: mailOptions.from || envs.SMTP_USER,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: mailOptions.html,
      });

      // Adaptar respuesta de Resend al formato de Nodemailer
      return {
        messageId: result.data?.id || result.id,
        response: result,
      };
    },
  };

  console.log("📧 Using Resend for emails");
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
