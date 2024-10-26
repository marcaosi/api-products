const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado ao MongoDB Atlas')
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas', error)
        process.exit(1)
    }
}

module.exports = connectDB