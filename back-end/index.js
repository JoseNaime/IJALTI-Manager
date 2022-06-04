const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

//establecemos conexion con la base de datos postgreSQL (hosteado en heroku)
const pgp = require('pg-promise')();
const config ={
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
    db.none(`CREATE TABLE usuario (username VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    sexo VARCHAR(55),
    rolActual VARCHAR(255),
    fechaNacimiento DATE,
    nacionalidad VARCHAR(50),
    estadoCivil VARCHAR(50),
    papelesVigentes VARCHAR(50),
    correoCuenta VARCHAR(255) UNIQUE NOT NULL,
    correoContacto VARCHAR(255),
    telefonoCuenta VARCHAR(50),
    telefonoContacto VARCHAR(50),
    linkedinContacto VARCHAR(255),
    githubContacto VARCHAR(255),
    nombreArchivoCV VARCHAR(255),
    biografia VARCHAR(2550),
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    rfc VARCHAR(255)); `);
    res.send("Succesfully created usuario table");
});


//Creamos la tabla de empresa
app.post('/crearTablaEmpresa',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS empresa;");
    db.none(`CREATE TABLE empresa (empresaID SERIAL PRIMARY KEY,
    nombreComercial VARCHAR(255) NOT NULL,
    nombreFiscal VARCHAR(255),
    estadoCuenta VARCHAR(50), 
    correoCuenta VARCHAR(255) UNIQUE NOT NULL,
    correoContacto VARCHAR(255),
    telefonoContacto VARCHAR(50),
    paginaWeb VARCHAR(255),
    ciudad VARCHAR(50),
    estado VARCHAR(50),
    domicilio VARCHAR(255),
    documentoAprobacion VARCHAR(255)); `);
    res.send("Succesfully created empresa table");
});


//Creamos la tabla de empleo
app.post('/crearTablaEmpleo',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS empleo;");
    db.none(`CREATE TABLE empleo (empleoID SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(2555),
    empresaID INT NOT NULL,
    FOREIGN KEY(empresaID) REFERENCES empresa(empresaID)); `);
    res.send("Succesfully created empleo table");
});

//Creamos la tabla de experiencia
app.post('/crearTablaExperiencia',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS experiencia;");
    db.none(`CREATE TABLE experiencia (experienciaID SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    username VARCHAR(255),
    FOREIGN KEY(username) REFERENCES usuario(username)); `);
    res.send("Succesfully created experiencia table");
});

//Creamos la tabla de admin
app.post('/crearTablaAdmin',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS admin;");
    db.none(`CREATE TABLE admin (adminID SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    correo VARCHAR(255) UNIQUE NOT NULL); `);
    res.send("Succesfully created admin table");
});

//Creamos la tabla de offer
app.post('/crearTablaOffer',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS offer;");
    db.none(`CREATE TABLE offer (offerID SERIAL PRIMARY KEY,
    fechaOffer DATE,
    empleoID INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY(empleoID) REFERENCES empleo(empleoID),
    FOREIGN KEY(username) REFERENCES usuario(username)); `);
    res.send("Succesfully created offer table");
});

//Creamos la tabla de habilidades
app.post('/crearTablaHabilidades',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS habilidades;");
    db.none(`CREATE TABLE habilidades (habilidadID SERIAL PRIMARY KEY,
    nombre VARCHAR(55) NOT NULL,
    color VARCHAR(55),
    nombreLogo VARCHAR(255)); `);
    res.send("Succesfully created habilidades table");
});


//Creamos la tabla de habilidadesDeUsuario
app.post('/crearTablaHabilidadesDeUsuario',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS habilidadesDeUsuario;");
    db.none(`CREATE TABLE habilidadesDeUsuario (habilidadID INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    tiempoExperiencia INT,
    PRIMARY KEY(habilidadID,username),
    FOREIGN KEY(habilidadID) REFERENCES habilidades(habilidadID),
    FOREIGN KEY(username) REFERENCES usuario(username)); `);
    res.send("Succesfully created habilidadesDeUsuario table");
});

//Creamos la tabla de habilidadesDeEmpleo
app.post('/crearTablaHabilidadesDeEmpleo',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS habilidadesDeEmpleo;");
    db.none(`CREATE TABLE habilidadesDeEmpleo (habilidadID INT NOT NULL,
    empleoID INT NOT NULL,
    tiempoExperiencia INT,
    PRIMARY KEY (habilidadID,empleoID),
    FOREIGN KEY(habilidadID) REFERENCES habilidades(habilidadID),
    FOREIGN KEY(empleoID) REFERENCES empleo(empleoID)); `);
    res.send("Succesfully created habilidadesDeEmpleo table");
});

//Creamos la tabla de educacion
app.post('/crearTablaEducacion',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    //Primero quitamos la tabla para volverla a crear
    db.none("DROP TABLE IF EXISTS educacion;");
    db.none(`CREATE TABLE educacion (educacionID SERIAL PRIMARY KEY,
    tipoEducacion VARCHAR(255),
    titulo VARCHAR(255),
    escuela VARCHAR(255),
    fechaInicio DATE NOT NULL,
    fechaFin DATE,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY(username) REFERENCES usuario(username)); `);
    res.send("Succesfully created educacion table");
});


app.delete('/allTables', (req,res)=>{
    db.none("DROP TABLE IF EXISTS educacion;");
    db.none("DROP TABLE IF EXISTS habilidadesDeEmpleo;");
    db.none("DROP TABLE IF EXISTS habilidadesDeUsuario;");
    db.none("DROP TABLE IF EXISTS habilidades;");
    db.none("DROP TABLE IF EXISTS offer;");
    db.none("DROP TABLE IF EXISTS admin;");
    db.none("DROP TABLE IF EXISTS experiencia;");
    db.none("DROP TABLE IF EXISTS empleo;");
    db.none("DROP TABLE IF EXISTS empresa;");
    db.none("DROP TABLE IF EXISTS usuario;");
    res.send("Deleted all tables succesfully");
})



app.put('/insertarInfoPrueba',(req,res)=>{

    //Insertamos dos usuarios de prueba
    db.none('DELETE FROM usuario;');
    db.none('DELETE FROM empresa;');
    db.none('DELETE FROM admin;');
    sleep(500);
    
    db.none(`INSERT INTO usuario(username, nombre, apellido, sexo, fechaNacimiento, nacionalidad, estadoCivil, papelesVigentes, rfc, correoCuenta, estado, ciudad)
    VALUES ('testUser','Jose','Naime','M','2002-02-17','Mexicano','Soltero','Ambos','ni idea','test@test.com','Jalisco','Guadalajara');`);
    db.none(`INSERT INTO usuario(username, nombre, apellido, sexo, fechaNacimiento, nacionalidad, estadoCivil, papelesVigentes, rfc, correoCuenta, estado, ciudad)
    VALUES ('severia','Santiago','Reyes','M','2001-07-21','Mexicano','Soltero','Visa','idk','severia@google.com','Jalisco','Guadalajara');`);


    //Insertamos dos empresas de prueba
    db.none(`INSERT INTO empresa(nombreComercial,nombreFiscal,estadoCuenta,correoCuenta,paginaWeb,ciudad,estado)
    VALUES ('Google','Google Inc', 'Aprovada', 'google@google.com', 'google.com', 'Tlajomulco', 'Jalisco');`);
    db.none(`INSERT INTO empresa(nombreComercial,nombreFiscal,estadoCuenta,correoCuenta,paginaWeb,ciudad,estado)
    VALUES ('IBM','IBM', 'En revision', 'contact@ibm.com', 'ibm.com', 'Guadalajara', 'Jalisco');`);

    //Insertamos un admin de prueba
    
    db.none(`INSERT INTO admin(nombre,apellido,correo)
    VALUES ('Emilio', 'BlackDrone', 'adminEmilio@fb.com');`);
    db.none(`INSERT INTO admin(nombre,apellido,correo)
    VALUES ('Marisol', 'Rod', 'adminMari@gmail.com');`);

    res.send("Inserted all info");

});



app.get('/getRol', (req,res)=>{
    var gotuser=null;
    var gotempresa=null;
    var gotadmin=null;
    db.any(`SELECT * FROM usuario WHERE correoCuenta='${req.query.email}' ;`, [true])
    .then(data => {
        if(data[0]){
            res.send({status:200, rol:"usuario"});
            gotuser=true;
        }else{
            gotuser=false;
            if(gotuser==false && gotempresa==false && gotadmin==false){
                res.send({status:200,rol:null});
            }
        }
    })
    .catch(error => {
        console.log('ERROR:', error);
        res.send(error);
    });

    db.any(`SELECT * FROM empresa WHERE correoCuenta='${req.body.email}' ;`, [true])
    .then(data => {
        if(data[0]){
            
            res.send({status:200,rol:"empresa"});
            gotempresa=true;
        }else{
            gotempresa=false;
            if(gotuser==false && gotempresa==false && gotadmin==false){
                res.send({status:200,rol:null});
            }
        }
        
    })
    .catch(error => {
        console.log('ERROR:', error);
        res.send(error);
    });

    db.any(`SELECT * FROM admin WHERE correo='${req.body.email}' ;`, [true])
    .then(data => {
        if(data[0] ){
            res.send({status:200,rol:"admin"});
            gotadmin=true;
            
        }else{
            gotadmin=false;
            if(gotuser==false && gotempresa==false && gotadmin==false){
                res.send({status:200,rol:null});
                return;
            }
        }
        
    })
    .catch(error => {
        console.log('ERROR:', error);
        res.send(error);
    });



});

app.put('/newAccount',(req,res)=>{
    if(req.body.tipoCuenta=='usuario'){
        //insertamos en la tabla la info que se pasa como body a este post
        db.none(`INSERT INTO usuario(username, nombre, apellido, sexo, fechaNacimiento, nacionalidad, estadoCivil, papelesVigentes, rfc, correoCuenta, telefonoCuenta, estado, ciudad)
         VALUES ('${req.body.data.username}', '${req.body.data.nombre}', '${req.body.data.apellido}', '${req.body.data.sexo}', '${req.body.data.fechaNacimiento}', '${req.body.data.nacionalidad}', '${req.body.data.estadoCivil}', '${req.body.data.papelesVigentes}', '${req.body.data.rfc}', '${req.body.data.correoCuenta}', '${req.body.data.telefonoCuenta}', '${req.body.data.estado}', '${req.body.data.ciudad}');`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 201});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send(error);
        });
    }
    else if(req.body.tipoCuenta=='empresa'){
        //insertamos en la tabla la info que se pasa como body a este post
        db.none(`INSERT INTO empresa(nombreComercial, nombreFiscal, correoCuenta, telefonoContacto, estado, ciudad)
         VALUES ('${req.body.data.nombreComercial}', '${req.body.data.nombreFiscal}','${req.body.data.correoCuenta}','${req.body.data.telefonoContacto}','${req.body.data.estado}','${req.body.data.ciudad}');`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 201});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send(error);
        });
    }else{
        res.send({status: 404});
    }

});

app.delete('/account', (req,res)=>{
    if(req.body.rol=='usuario'){
        db.none(`DELETE FROM usuario WHERE correoCuenta='${req.body.email}';`)    .then(data => {
           //si encuentra los datos, los manda
           res.send({status: 201});
       })
       .catch(error => {
           //si hay un error con el select, lo imprime y lo regresa
           console.log('ERROR:', error);
           res.send({status: 404});
       });
    }else if(req.body.rol=='empresa'){
        db.none(`DELETE FROM empresa WHERE correoCuenta='${req.body.email}';`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 201});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
    }else if(req.body.rol=='admin'){
        db.none(`DELETE FROM admin WHERE correo='${req.body.email}';`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 201});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
    }
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

app.get('/empresas', (req,res)=>{
    db.any('SELECT * FROM empresa;', [true])
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

app.get('/admins', (req,res)=>{
    db.any('SELECT * FROM admin;', [true])
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
app.post('/login', (req,res)=>{
    var userEmail=req.body.email;
    var password=req.body.password;

    db.any(`SELECT * FROM usuario WHERE correoCuenta='${userEmail}';`, [true])
    .then(data => {
        //si encuentra los datos, los manda
        var importantData=data[0];
        if(importantData){
            if(importantData.password==password){
                res.send({
                    status:200,
                    data:importantData
                });
            }
            else{
                res.send({
                    status:404,
                    data:"incorrect password"
                });
            }
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