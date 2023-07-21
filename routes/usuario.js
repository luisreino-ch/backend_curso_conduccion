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

    const query = `INSERT INTO usuarios (nombres, apellidos, cedula, fechaNacimiento, correoElectronic, nivelAcademico, tipoSangre, tipoLicencia, fotoExamenPs) VALUES ('${data.nombres}', '${data.apellidos}', '${data.cedula}', '${data.fechaNacimiento}', '${data.correoElectronic}', '${data.nivelAcademico}', '${data.tipoSangre}', '${data.tipoLicencia}', '${data.fotoExamenPs}')`;

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

// Consultar todos los usuarios
router.get('/usuarios', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'error en conexión');
        }
        conn.query('SELECT * FROM usuarios', function (err, rows) {
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







/* // insertar un usuario a la bdd
router.post('/usuario/', (req,res)=>{

    const data ={
        nombreusuario: req.body.nombreusuario,
        apellidousuario: req.body.apellidousuario,
        cedulausuario: req.body.cedulausuario,
        telefonousuario: req.body.telefonousuario,
        direccionusuario: req.body.direccionusuario,
        correousuario: req.body.correousuario
    }

    const query = `INSERT INTO usuario (nombreusuario, apellidousuario, cedulausuario, telefonousuario, direccionusuario, correousuario) VALUES ('${data.nombreusuario}','${data.apellidousuario}','${data.cedulausuario}','${data.telefonousuario}','${data.direccionusuario}','${data.correousuario}')`;
    

    getConnection(function(err,conn){
        if(err){
            console.log('NO SE PUDO CONECTAR A LA BASE DE DATOS' + err);
        }


        conn.query(query, function(err,result){
            if(!err){
                return res.json({status: 'REGISTRO EXITOSO'});
            }else{
                console.log(err);
            }
            conn.release();
        });
    });
});


// consultar todos los usuarios
router.get('/usuarios', (req,res)=>{
    getConnection(function(err,conn){
        const {cedula} = req.params;
        if(err){
            return res.sendStatus(400,'error en conexión');
        }
        conn.query('SELECT * FROM usuario ', function(err,rows){
            if(err){
                conn.release();
                return res.sendStatus(400,'No se puede conectar a la base de datos')
            }
            res.send(rows);
            conn.release();
        });
    });
});



// traer un usuario mediante el id 
router.get('/usuario/getById/:id', (req,res)=>{
    getConnection(function(err,conn){
        const {id} = req.params;
        console.log('entra usuario por id')
        if(err){
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM usuario WHERE idusuario = ?', [id], function(err,rows){
            if(err){
                conn.release();
                return res.sendStatus(400,'No se puede conectar a la base de datos')
            }
            res.send(rows);
            conn.release();
        });
    });
});
 */

    

module.exports = router;