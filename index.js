const express = require('express');
const server = express();
const rouuter = require('./src/router/index');


server.get('/', (req, res) => {
    res.send('API de la tienda Elegance Mode');
});

server.use('/api',rouuter);

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});