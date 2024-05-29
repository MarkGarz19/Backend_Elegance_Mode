const express = require('express');
const server = express();
const dotenv = require('dotenv');
const rouuter = require('./src/router/router');
dotenv.config();

const PORT = process.env.PORT || 3000;

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
})

server.get('/', (req, res) => {
    res.send('API de la tienda Elegance Mode');
})

server.use('/api', rouuter); // ruta para traer todos los productos

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))