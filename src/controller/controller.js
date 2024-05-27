const Modelproductos = require('../model/model');
class productos { // controlador de productos
    static async getAll(req, res) { // para obtener todos los productos
        const { data, error } = await Modelproductos.getAll();
        error ? res.status(400).json({ error: "No hay productos en la base de datos" })
            : res.status(200).json(data)
    }
}

module.exports = productos