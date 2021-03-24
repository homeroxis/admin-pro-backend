const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

// configurar CORS
app.use(cors());

// lectura o parseo del body
app.use(express.json());

// base de datos
dbConnection();

// https://cloud.mongodb.com/ Database Access --> u, p
// mean_user
// Bw82iYemj53CH2Yw

// rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
