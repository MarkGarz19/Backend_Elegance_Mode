const express = require('express');
const server = express();
const dotenv = require('dotenv');
const rouuter = require('./src/router/router');
dotenv.config();

const PORT = process.env.PORT || 3000;

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})

server.use(express.json());

server.get('/', (req, res) => {
    res.send('API de la tienda Elegance Mode');
})

server.use('/api', rouuter); // ruta para traer todos los productos

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))