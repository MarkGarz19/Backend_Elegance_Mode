const Modelproductos = require('../model/model');
class productos { // controlador de productos
    static async getAll(req, res) { // para obtener todos los productos
        const { data, error } = await Modelproductos.getAll();
        error ? res.status(400).json({ error: "No hay productos en la base de datos" })
            : res.status(200).json(data)
    }
    static async getById(req, res) { // para obtener un solo producto
        const { id } = req.params
        try {
            if (!id || !Number(id)) {
                res.status(400).json({ error: "No se ha recibido un id del producto correcto" })
            }
            const { data, error } = await Modelproductos.getById(id)
            error ? res.status(400).json({ error: "No hay productos en la base de datos" })
                : res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = productos