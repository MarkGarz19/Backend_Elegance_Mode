const express = require('express');
const rouuter = express.Router();
const productos = require('../controller/controller');
const usuario = require('../controller/controllerusuario');

// http://localhost:3007/api/productos
rouuter.get('/productos', productos.getAll) // ruta para traer todos los productos
rouuter.get('/productos/:id', productos.getById) // ruta para traer un solo producto

rouuter.post('/productos/register', usuario.registerUser)
rouuter.post('/productos/login', usuario.loginUser)


module.exports = rouuter // exportamos la ruta 