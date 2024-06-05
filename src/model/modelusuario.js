const { connectToMongoDB, disconnectFromMongoDB } = require('../config/server');

class ModelUsuarios {
    static async getAll() {
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const resultado = await dataDB.db('Elegance').collection('usuarios').find().toArray();
            await disconnectFromMongoDB();

            if (!resultado) {
                throw Error("No hay usuarios en la base de datos");
            }

            return { data: resultado, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async registerUser(newUser) {
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const result = await dataDB.db('Elegance').collection('usuarios').insertOne(newUser);
            await disconnectFromMongoDB();
            return { data: result, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async UsarioEmail(email){
        try{
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const resultado = await dataDB.db('Elegance').collection('usuarios').findOne({email: email});
            await disconnectFromMongoDB();
            return resultado
        }catch(error){
            return { error: true, message: error.message };
        }
    }
    static async loginUser({ email, password }) {
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }

            const user = await dataDB.db('Elegance').collection('usuarios').findOne({ email });
            await disconnectFromMongoDB();

            if (!user) {
                throw new Error("Usuario Invalido");
            }

            if (user.password !== password) {
                throw new Error("Contraseña incorrecta");
            }

            return { data: user, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}

module.exports = ModelUsuarios;
