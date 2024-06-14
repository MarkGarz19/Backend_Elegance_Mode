const { connectToMongoDB, disconnectFromMongoDB } = require('../config/server'); // importamos las dos funciones para conectar y desconectar la base de datos de mongo
class Modelcarrito { // creamos la clase modelo de carrito
    static async newCarrito(newCarrito) { // esta funcion asicronica deberia comunicarse con la base de datos para crear un nuevo carrito comprado
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) { // si no se ha podido conectar daria un error
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const result = await dataDB.db('Elegance').collection('carrito').insertOne(newCarrito); // insertamos el o los productos en el carrito comprados
            await disconnectFromMongoDB();
            return { data: result, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}

module.exports = Modelcarrito