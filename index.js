const express = require('express');
const server = express();
const dotenv = require('dotenv');
const rouuter = require('./src/router/router');
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
dotenv.config();

const PORT = process.env.PORT || 3000;

server.use((req, res, next) => { // esto es para que se puedan hacer peticiones sin tener problemas con las configuraciones de cors
    res.setHeader('Access-Control-Allow-Origin', '*'); // para que se puedan hacer peticiones desde cualquier lugar
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization');
    next()
})

server.use(express.json()); // para poder leer el body de las peticiones

server.get('/', (req, res) => {
    res.send('API de la tienda Elegance Mode');
})

server.use('/api', rouuter); // ruta para traer todos los productos

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))

console.log('PAYPAL_API', PAYPAL_API);