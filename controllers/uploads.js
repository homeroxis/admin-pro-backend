const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'Tipo no es usuario, médico u hospital'
        });
    }

    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); // volverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extensiones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extensión de archivo no válida'
        });
    }

    // generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, err => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg: 'Problemas al mover el archivo'
            });
        }

        // actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido correctamente',
            nombreArchivo
        });
    });
};

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
};

module.exports = {
    fileUpload,
    retornaImagen
};
