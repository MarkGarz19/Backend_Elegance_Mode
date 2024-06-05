const ModelUsuarios = require('../model/modelusuario');


class UserController {
    static async registerUser(req, res) {
        const newUser = req.body;

        const usuarioexistente = await ModelUsuarios.UsarioEmail(newUser.email);
        if (usuarioexistente) {
            return res.status(200).json({ message: "El usuario ya existe" });
        }
        
        const result = await ModelUsuarios.registerUser(newUser);

        if (result.error) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: "Usuario registrado exitosamente", id: result.data.insertedId });
    }


    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
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

