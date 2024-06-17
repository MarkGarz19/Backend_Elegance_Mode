const express = require('express');
const server = express();
const dotenv = require('dotenv');
const rouuter = require('./src/router/router');
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
const cors = require('cors');
dotenv.config();

const PORT = process.env.PORT || 3000;

const corsOptions = { origin: ['*'], method: ['GET', 'POST'], allowHeaders: ['Content-Type', 'Authorization'] }

server.use(cors(corsOptions));

server.use(express.json()); // para poder leer el body de las peticiones

server.get('/', (req, res) => {
    res.send('API de la tienda Elegance Mode');
})

server.use('/api', rouuter); // ruta para traer todos los productos

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))

console.log('PAYPAL_API', PAYPAL_API);