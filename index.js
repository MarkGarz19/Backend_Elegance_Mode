const express = require('express');
const server = express();
const dotenv = require('dotenv');
const rouuter = require('./src/router/router');
dotenv.config();

const PORT = process.env.PORT || 3000;
server.get('/', (req, res) => {
    res.send('API de la tienda Elegance Mode');
})

server.use('/api', rouuter); // ruta para traer todos los productos

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))