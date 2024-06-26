const Modelproductos = require('../model/model'); // importamos el modelo de productos
class productos { // controlador de productos
    static async getAll(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para obtener todos los productos
        const { data, error } = await Modelproductos.getAll(); // esto indica que queremos los datos de todos los productos o si no hay  daria un error
        error ? res.status(400).json({ error: "No hay productos en la base de datos" })
            : res.status(200).json(data)
    }
    static async getById(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para obtener un solo proyecto
        const { id } = req.params // esto indica que queremos el id del producto
        if (!id || !Number(id)) { // validamos que el id sea correcto
            return res.status(400).json({ error: "No se ha recibido un id del producto correcto" }) // si no es correcto devolvemos un error
        }
        const { data, error } = await Modelproductos.getById(id) // esto indica que queremos el id del producto o si no hay daria un error
        error ? res.status(400).json({ error: "No hay productos en la base de datos" })
            : res.status(200).json(data)
    }

    static async ObtenerProductoId(req, res) { // esta funcion asicronica deberia comunicarse con la base de datos para obtener un solo proyecto y ponerlo en el carrito
        const idproducto = req.params.id; // esta variable es para el body de la petición
        try {
            const producto = await Modelproductos.getById(idproducto); // esta variable cogera la id del producto y mostrara el producto en la peticion
            if (producto.data) { //si el producto existe en la base de datos
                res.status(200).json(producto.data); // se devolvera ese producto en la peticion a traves de un json
            } else {
                res.status(404).json({ message: 'No se ha encontrado el producto' }); // si el proyecto no existe en la base de datos
            }
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }
    }
}


module.exports = productos