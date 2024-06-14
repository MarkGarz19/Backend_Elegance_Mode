const express = require('express');
const rouuter = express.Router();
const productos = require('../controller/controller');
const usuario = require('../controller/controllerusuario');
const mensaje = require('../controller/controllermensaje');
const carrito = require('../controller/controllercarrito');

// http://localhost:3007/api/productos
rouuter.get('/productos', productos.getAll) // ruta para traer todos los productos
rouuter.get('/productos/:id', productos.getById) // ruta para traer un solo producto
rouuter.get('/productos/carrito/:id', productos.ObtenerProductoId) // ruta para traer un solo producto

rouuter.post('/productos/register', usuario.registerUser) // ruta para registrar usuario
rouuter.post('/productos/login', usuario.loginUser) // ruta para iniciar sesión
rouuter.post('/productos/mensajes', mensaje.mensajesnew) // ruta para crear un nuevo mensaje

rouuter.post('/productos/compra', carrito.compraProductoCarrito)
rouuter.get('/productos/compra/success', carrito.handleSuccess);
rouuter.get('/productos/compra/cancel', carrito.handleCancel);


module.exports = rouuter // exportamos la ruta 
