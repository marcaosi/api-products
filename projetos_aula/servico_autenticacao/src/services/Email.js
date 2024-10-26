const nodemailer = require("nodemailer")

const transportador = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "20ab9fdc796c93",
    pass: "3f3b9a33b597b3"
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