const express = require('express');
const rouuter = express.Router();

rouuter.get('/productos', (req, res) => { }) // ruta para obtener todos los productos
rouuter.post('/productos') // ruta para crear nuevos productos

module.exports = rouuter // exportamos la ruta 