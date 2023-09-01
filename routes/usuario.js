const express = require('express');
const router = express.Router();
const getConnection = require('../conexion');
const { connect } = require('http2');


// Insertar un usuario en la base de datos
router.post('/usuario/', (req, res) => {
    const data = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        cedula: req.body.cedula,
        fechaNacimiento: req.body.fechaNacimiento,
        correoElectronic: req.body.correoElectronic,
        nivelAcademico: req.body.nivelAcademico,
        tipoSangre: req.body.tipoSangre,
        tipoLicencia: req.body.tipoLicencia,
        fotoExamenPs: req.body.fotoExamenPs,
        imagenPago: req.body.imagenPago,
        estado: req.body.estado
    };

    const query = `INSERT INTO usuarios (nombres, apellidos, cedula, fechaNacimiento, correoElectronic, nivelAcademico, tipoSangre, tipoLicencia, fotoExamenPs, imagenPago, estado) VALUES ('${data.nombres}', '${data.apellidos}', '${data.cedula}', '${data.fechaNacimiento}', '${data.correoElectronic}', '${data.nivelAcademico}', '${data.tipoSangre}', '${data.tipoLicencia}', '${data.fotoExamenPs}',null,0)`;

    getConnection(function (err, conn) {  
        if (err) {
            console.log('NO SE PUDO CONECTAR A LA BASE DE DATOS' + err);
        }

        conn.query(query, function (err, result) {
            if (!err) {
                return res.json({ status: 'REGISTRO EXITOSO' });
            } else {
                console.log(err);
            }
            conn.release();
        });
    });
});


// Consultar todos los usuarios Estado 0
router.get('/usuarios', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'error en conexión');
        }
        conn.query('SELECT * FROM usuarios WHERE estado = 0', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});


// Consultar todos los usuarios Estado 1
router.get('/usuarios1', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'error en conexión');
        }
        conn.query('SELECT * FROM usuarios WHERE estado = 1', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});


// Traer un usuario mediante el ID
router.get('/usuario/getById/:id', (req, res) => {
    getConnection(function (err, conn) {
        const { id } = req.params;
        console.log('entra usuario por id');
        if (err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.send(rows);
            conn.release();
        });
    });
});
// Update User Route (`PUT /usuario/update/:id`)
router.put('/usuario/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedData = {
        estado: req.body.estado
    };

    const updateQuery = `
        UPDATE usuarios
        SET
            estado = ${updatedData.estado}
        WHERE idusuarios = ${id}
    `;

    getConnection(function (err, conn) {
        if (err) {
            console.log('NO SE PUDO CONECTAR A LA BASE DE DATOS' + err);
            return res.sendStatus(500); // Internal Server Error
        }

        conn.query(updateQuery, function (err, result) {
            if (!err) {
                if (result.affectedRows > 0) {
                    return res.json({ status: 'ACTUALIZACIÓN EXITOSA' });
                } else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            } else {
                console.log(err);
                return res.sendStatus(500); // Internal Server Error
            }
            conn.release();
        });
    });
});


// Delete User Route (`DELETE /usuario/delete/:id`)
router.delete('/usuario/delete/:id', (req, res) => {
    const { id } = req.params;

    const deleteQuery = `
        DELETE FROM usuarios
        WHERE idusuarios = ${id}
    `;

    getConnection(function (err, conn) {
        if (err) {
            console.log('NO SE PUDO CONECTAR A LA BASE DE DATOS' + err);
            return res.sendStatus(500); // Internal Server Error
        }

        conn.query(deleteQuery, function (err, result) {
            if (!err) {
                if (result.affectedRows > 0) {
                    return res.json({ status: 'ELIMINACIÓN EXITOSA' });
                } else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            } else {
                console.log(err);
                return res.sendStatus(500); // Internal Server Error
            }
            conn.release();
        });
    });
});



    

module.exports = router;
