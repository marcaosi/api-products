const nodemailer = require("nodemailer")

const transportador = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWRD
  }
})

const enviarEmail = async (destinatario, assunto, conteudo) => {
    const info = await transportador.sendMail({
        from: '"Marcos Antonio" <marcosantonio@microsservicos.com>',
        to: destinatario,
        subject: assunto,
        html: conteudo
    })

    return true
}

module.exports = {
    enviarEmail
}