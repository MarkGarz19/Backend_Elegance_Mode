const { connectToMongoDB, disconnectFromMongoDB } = require('../config/server'); // importamos las dos funciones para conectar y desconectar la base de datos de mongo
class Modelmensajes { // creamos la clase modelo de mensajes
    static async newMensaje(newMensaje) { // esta funcion asicronica deberia comunicarse con la base de datos para crear un nuevo mensaje
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) { // si no se ha podido conectar daria un error
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const result = await dataDB.db('Elegance').collection('contacto').insertOne(newMensaje); // insertamos el nuevo mensaje en la base de datos de Elegance en la tabla contacto
            await disconnectFromMongoDB();
            return { data: result, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}

module.exports = Modelmensajes