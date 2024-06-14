const ModelUsuarios = require('../model/modelusuario');


class UserController {
    static async registerUser(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para registrar un nuevo usuario
        const newUser = req.body;

        const usuarioexistente = await ModelUsuarios.UsarioEmail(newUser.email); // esta variable es para saber si el usuario ya existe
        if (usuarioexistente) {
            return res.status(200).json({ message: "El usuario ya existe" });
        }
        
        const result = await ModelUsuarios.registerUser(newUser); // esta variable es para guardar el nuevo usuario

        if (result.error) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: "Usuario registrado exitosamente", id: result.data.insertedId });
    }


    static async loginUser(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para iniciar sesion
        try {
            const { email, password } = req.body; // se declara la variable email y password para el body de la petición
            const result = await ModelUsuarios.loginUser({ email, password });

            if (result.error) {
                return res.status(401).json({ message: result.message });
            }

            return res.status(200).json({ message: 'Inicio de sesión exitoso', id: result.data._id });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }

    }
}
module.exports = UserController;

