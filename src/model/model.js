const {connectToMongoDB, disconnectFromMongoDB} = require('../config/server');

class Modelproductos {
    static async getAll() { // esto deberia comunicarse con la base de datos
        try {
            const dataDB = await connectToMongoDB();
            if(!dataDB){
                throw Error("No se ha podido conectar a la base de datos de MongoDB")
            }
            const resultado = dataDB.db('EleganceMode').collection('productos').find().toArray();
            if(!resultado){
                throw Error("No hay resultados ")
            }
            return {data: resultado, error: false}

        } catch (error) {
            return error
        }
}
}

module.exports = Modelproductos