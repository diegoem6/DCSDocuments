const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_MONGO);
        console.log(`MongoDB conectado: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); //detener la app
    }
}

module.exports = conectarDB;