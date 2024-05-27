const express = require('express');
const rouuter = express.Router();
const productos = require('../controller/controller');

// http://localhost:3007/api/productos
rouuter.get('/productos', productos.getAll) // ruta para traer todos los productos
rouuter.post('/productos') // ruta para crear nuevos productos

module.exports = rouuter // exportamos la ruta 