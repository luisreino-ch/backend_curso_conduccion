const mysql = require('mysql');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'cursoconduccion'
})

const getConnection = function(cb){
    pool.getConnection(function(err,connection){
        if (err) {
            return cb(err);
        }
        cb(null,connection);
    });
};

module.exports = getConnection;