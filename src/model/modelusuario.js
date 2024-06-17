const { connectToMongoDB, disconnectFromMongoDB } = require('../config/server'); // importamos las dos funciones para conectar y desconectar la base de datos de mongo
const brycpt = require('bcryptjs'); // esta variable es para encriptar la contraseña del usuario
class ModelUsuarios { // creamos la clase modelo de usuarios
    static async getAll() { // esta funcion asicronica deberia comunicarse con la base de datos para obtener todos los usuarios
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const resultado = await dataDB.db('Elegance').collection('usuarios').find().toArray(); // mostraria todos los usuarios registrados en la base de datos
            await disconnectFromMongoDB();

            if (!resultado) { // en caso de que no hay usuarios daria un error
                throw Error("No hay usuarios en la base de datos");
            }

            return { data: resultado, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async registerUser(newUser) { // esta funcion asicronica deberia comunicarse con la base de datos para registrar un nuevo usuario
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const result = await dataDB.db('Elegance').collection('usuarios').insertOne(newUser); // insertamos el nuevo usuario en la base de datos de Elegance en la tabla usuarios
            await disconnectFromMongoDB();
            return { data: result, error: false };

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async UsarioEmail(email) { // esta funcion asicronica deberia comunicarse con la base de datos para obtener un usuario por email
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }
            const resultado = await dataDB.db('Elegance').collection('usuarios').findOne({ email: email }); // se cogera el email del usuario para verificar si existe
            await disconnectFromMongoDB();
            return resultado
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
    static async loginUser({ email, password }) { // esta funcion deberia comunicarse con la base de datos para iniciar sesión y obtener el usuario correspondiente
        try {
            const dataDB = await connectToMongoDB();
            if (!dataDB) {
                throw new Error("No se ha podido conectar a la base de datos de MongoDB");
            }

            const user = await dataDB.db('Elegance').collection('usuarios').findOne({ email }); // se cogera el email del usuario para verificar si existe y se devolvera el usuario
            await disconnectFromMongoDB();

            if (!user) {
                throw new Error("Usuario Invalido"); // en caso de que el usuario no exista devolvemos un error
            }

            const isMatch = await brycpt.compare(password, user.password); // esta variable es para comparar la contraseña del usuario

            if (!isMatch) { // en caso de que la contraseña no coincida devolvemos un error
                throw new Error("Contraseña Invalida");
            }

            return { data: user, error: false }; // en caso de que coincida la contraseña devolvemos el usuario

        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}

module.exports = ModelUsuarios;
