const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

//establecemos conexion con la base de datos postgreSQL (hosteado en heroku)
const pgp = require('pg-promise')();
const config = {
    user: process.env.DB_USER,
    database: process.env.DB_ID_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    ssl: {rejectUnauthorized: false}
}; 
const db = pgp(config);
db.connect();


//Creamos la tabla de usuario
app.post('/crearTablaUsuario',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS usuario;");
    db.none("CREATE TABLE usuario (username VARCHAR(255) PRIMARY KEY, password VARCHAR(255) NOT NULL, rol VARCHAR(50) NOT NULL, nombre VARCHAR(255), apellido VARCHAR(255), sexo VARCHAR(55), rolActual VARCHAR(255),fechaNacimiento DATE, nacionalidad VARCHAR(50), estadoCivil VARCHAR(50), papelesVigentes BOOLEAN, correoCuenta VARCHAR(255) UNIQUE NOT NULL, correoContacto VARCHAR(255), telefonoCuenta VARCHAR(50), telefonoContacto VARCHAR(50), linkedinContacto VARCHAR(255), githubContacto VARCHAR(255), nombreArchivoCV VARCHAR(255), biografia VARCHAR(2550), ciudad VARCHAR(50), estado VARCHAR(50), rfc VARCHAR(255)); ");
    res.send("success");
});

//hacer que este newuser sea una creacion de usuario universal (tato para usuarios normales como para empresas. Utilizamos el parametro de rol que se va a pasar en request)
app.post('/newUser',(req,res)=>{
    //insertamos en la tabla la info que se pasa como body a este post
    db.none(`INSERT INTO usuario(username, password, rol, nombre, apellido, sexo, fechaNacimiento, nacionalidad, estadoCivil, papelesVigentes, rfc, correoCuenta, telefonoCuenta, estado, ciudad) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.rol}', '${req.body.nombre}', '${req.body.apellido}', '${req.body.sexo}', '${req.body.fechaNacimiento}', '${req.body.nacionalidad}', '${req.body.estadoCivil}', ${req.body.papelesVigentes}, '${req.body.rfc}', '${req.body.correoCuenta}', '${req.body.telefonoCuenta}', '${req.body.estado}', '${req.body.ciudad}');`)    .then(data => {
        //si encuentra los datos, los manda
        res.send("success");
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send(error);
    });
});

app.get('/usuarios', (req,res)=>{
    db.any('SELECT * FROM usuario;', [true])
    .then(data => {
        //si encuentra los datos, los manda
        res.send(data);
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send(error);
    });
});

//tenemos que agregar la funcionalidad para que el login sea universal sin importar el rol
app.get('/login', (req,res)=>{
    var userEmail=req.body.email;
    var password=req.body.password;

    db.any(`SELECT * FROM usuario WHERE correoCuenta='${userEmail}';`, [true])
    .then(data => {
        //si encuentra los datos, los manda
        var importantData=data[0];
        if(importantData.password==password){
            res.send({
                status:200,
                data:importantData
            });
        }
        else{
            res.send({
                status:404,
                data:"no data found"
            });
        }
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send(error);
    });
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});