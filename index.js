require('dotenv').config();

const express = require('express');
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

// Bw82iYemj53CH2Yw
// mean_user

// rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
