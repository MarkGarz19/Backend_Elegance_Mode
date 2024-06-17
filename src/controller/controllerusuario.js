const ModelUsuarios = require('../model/modelusuario');


class UserController {
    static async registerUser(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para registrar un nuevo usuario
        const newUser = req.body; // se declara la variable newUser para el body de la petición
        const brycpt = require('bcryptjs'); // esta variable es para encriptar la contraseña del usuario
        const salt = 10; // esta variable es para encriptar la contraseña del usuario en 10 vueltas

        const usuarioexistente = await ModelUsuarios.UsarioEmail(newUser.email); // esta variable es para saber si el usuario ya existe
        if (usuarioexistente) {
            return res.status(200).json({ message: "El usuario ya existe" });
        }

        const password_hashed = await brycpt.hash(newUser.password, salt); // esta variable es para encriptar la contraseña del usuario
        const newUser_password = { ...newUser, password: password_hashed }; // esta variable es para crear nuevos datos del usuario con la contraseña encriptada
        const result = await ModelUsuarios.registerUser(newUser_password); // esta variable es para guardar el nuevo usuario

        if (result.error) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: "Usuario registrado exitosamente", id: result.data.insertedId });
    }


    static async loginUser(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para iniciar sesion
        try {
            const brycpt = require('bcryptjs');
            const { email, password } = req.body; // se declara la variable email y password para el body de la petición
            const result = await ModelUsuarios.loginUser({ email, password }); // esta variable es para iniciar la sesion con el email y la contraseña
            const confirmPassword = await brycpt.compare(password, result.data.password);

            if (result.error) {
                return res.status(401).json({ message: result.message });
            }

            if (!confirmPassword){
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
                return res.status(200).json({ message: 'Inicio de sesión exitoso', id: result.data._id });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }

    }
}
module.exports = UserController;

