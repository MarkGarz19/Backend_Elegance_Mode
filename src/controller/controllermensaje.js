const Modelmensajes = require('../model/modelmensaje');

class Controllermensajes {// creamos la clase controlador de productos
    static async mensajesnew(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para crear un nuevo mensaje
        const newMensaje = req.body; // se declara la variable newMensaje para el body de la petición

        const result = await Modelmensajes.newMensaje(newMensaje);

        if (result.error) { // indicamos si hay un error nos devuelve el status 400 con un message
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: 'Mensaje creado exitosamente' });
    }
}

module.exports = Controllermensajes