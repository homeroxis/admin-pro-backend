require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// base de datos
dbConnection();

console.log(process.env);

// Bw82iYemj53CH2Yw
// mean_user

// rutas
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    msg: 'Hola mundo'
  });
});

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
