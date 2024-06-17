const { connectToMongoDB, disconnectFromMongoDB } = require('../config/server'); // importamos las dos funciones para conectar y desconectar la base de datos de mongo

class Modelproductos {
    static async getAll() { // esta funcion asicronica deberia comunicarse con la base de datos para obtener todos los productos
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw Error("No se ha podido conectar a la base de datos de MongoDB")
            }
            const resultado = await dataDB.db('Elegance').collection('productos').find().toArray(); // insertamos el o los productos en el catalogo
            await disconnectFromMongoDB();
            console.log(resultado)
            if (!resultado) { // si no hay productos daria un error
                throw Error("No hay productos en la base de datos");
            }
            return { data: resultado, error: false }

        } catch (error) {
            return error
        }
    }


    static async getById(id) {// esta funcion asicronica deberia comunicarse con la base de datos para obtener un solo producto
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw Error("No se ha podido conectar a la base de datos de MongoDB")
            }
            const resultado = await dataDB.db('Elegance').collection('productos').findOne({ id: Number(id) }); // se cogera la id del producto y se devolvera el resultado
            console.log(resultado)
            await disconnectFromMongoDB();
            if (!resultado) {
                return { data: null, error: true }
            }
            return { data: resultado, error: false }
        } catch (error) {
            return { data: null, error: false }
        }
    }

}

module.exports = Modelproductos