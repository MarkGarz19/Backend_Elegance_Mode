const dotenv = require('dotenv'); // importamos dotenv
dotenv.config(); // configuramos dotenv

const { MongoClient } = require('mongodb'); // importamos mongodb
const cliente = new MongoClient(process.env.MONGO_URL); // configuramos la url de la base de datos del MongoDB Atlas

async function connectToMongoDB() { // esta funcion asicronica deberia comunicarse para conectarse con la base de datos de mongodb
    try {
        await cliente.connect()
        console.log("Conectado a la base de datos de MongoDB")
        return cliente
    } catch (error) {
        console.log("Error al conectar a la base de datos de MongoDB")
        return null
    }
}

async function disconnectFromMongoDB() { // esta funcion asicronica deberia comunicarse para desconectarse de la base de datos de mongodb
    try {
        await cliente.close()
        console.log("Desconectado de la base de datos de MongoDB")
    } catch (error) {
        console.log("Error al desconectar de la base de datos de MongoDB", error)
    }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB } // exportamos dos funciones una conectar y la otra desconectar la base de datos de mongo