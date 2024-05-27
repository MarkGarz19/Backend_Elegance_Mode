const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
const cliente = new MongoClient(process.env.MONGO_URL);

async function connectToMongoDB() { // para conectar con la base de datos de mongodb
    try {
        await cliente.connect()
        console.log("Conectado a la base de datos de MongoDB")
        return cliente
    } catch (error) {
        console.log("Error al conectar a la base de datos de MongoDB")
        return null
    }
}

async function disconnectFromMongoDB() { // para desconectar de la base de datos de mongodb
    try {
        await cliente.close()
        console.log("Desconectado de la base de datos de MongoDB")
    } catch (error) {
        console.log("Error al desconectar de la base de datos de MongoDB", error)
    }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB } // exportamos dos funciones una conectar y la otra desconectar la base de datos de mongo