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

app.put('/insertarInfo',(req,res)=>{

    /*
        db.none(`INSERT INTO habilidades(nombre,color)
        VALUES ('JavaScript', '#FFF8BE');`);
        db.none(`INSERT INTO habilidades(nombre,color)
        VALUES ('React', '#61DBFB');`);
        db.none(`INSERT INTO habilidades(nombre,color)
        VALUES ('Python', '#FFD43B');`);
    
    
        //Insertamos empleo a la tabla
        db.none(`INSERT INTO empleo(titulo, descripcion, empresaID)
        VALUES('Front-end developer', 'Este es una descripcion de ejemplo para el rol', 3);`);
        db.none(`INSERT INTO empleo(titulo, descripcion, empresaID)
        VALUES('Ingeniero de Datos Senior', 'La responsabilidad sera desarrollar data pipelines y analizar datos', 4);`);
        
        
        //Habilidades de empleo
        db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID)
        VALUES(1,2);`);
        db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID,tiempoExperiencia)
        VALUES(3,2,5);`);
        db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID,tiempoExperiencia)
        VALUES(2,1,4);`);
    
        //Aplicaciones
        db.none(`INSERT INTO aplicacion(aplicacionFecha, status,empleoID, username)
        VALUES('06-05-2022','Revision',2,'pigihunter' );`);
        db.none(`INSERT INTO aplicacion(aplicacionFecha, status,empleoID, username)
        VALUES('06-05-2022','Aceptado',1,'pigihunter' );`);
        db.none(`INSERT INTO aplicacion(aplicacionFecha, status,empleoID, username)
        VALUES('06-05-2022','Aceptado',2,'JoseNaime' );`);
    */
    
    
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

app.get('/aplicacionesUsuario', (req,res)=>{
    

    //Queremos aplicaciones.
    //status,aplicacionFecha(aplicacion), titulo, descripcion (Empleo), nombreComercial, ciudad, estado (empresa) , habilidades
    //console.log(response);
    db.any(`SELECT aplicacion.username, aplicacion.aplicacionFecha,aplicacion.status,
    empleo.empleoID, empleo.titulo,empleo.descripcion,
    empresa.nombreComercial,empresa.ciudad,empresa.estado
     FROM aplicacion JOIN empleo ON aplicacion.empleoid=empleo.empleoid JOIN empresa ON empleo.empresaID=empresa.empresaID JOIN usuario ON aplicacion.username=usuario.username
     WHERE usuario.correoCuenta='${req.body.email}';`, [true])
    .then(data => {
        //si encuentra los datos, los manda
        var finalData=data;
        var habilidadesArr=[];
        for(i in finalData){
            var completed=false;
            db.any(`SELECT * FROM habilidadesDeEmpleo WHERE empleoID=${finalData[i].empleoid}`,[i])
            .then(data2=>{
                habilidadesArr.push(data2);
                if(habilidadesArr.length===finalData.length){
                    //console.log(habilidadesArr);
                    for(j in finalData){
                        finalData[j].habilidades=habilidadesArr[j];
                    }
                    res.send(finalData);
                }
            });
            
        }
        
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send(error);
    });

});

//Busqueda de empleos
app.get('/buscarEmpleos', (req,res)=>{
    //Filtros  (Empresa, Titulo, Habilidades, Fecha?)
    /*
    {
        Empresa: ["Oracle", "IBM", "Microsoft"],
        Titulo: "Titulo",
        Habilidades: ["React", "Python"]
    
    }
    
    {
        {empleo}
    }
    
    */
        var empresasText="( ";
        for(i in req.body.empresas){
            var empresasText=empresasText.concat("'");
            var empresasText=empresasText.concat(req.body.empresas[i].toLowerCase());
            var empresasText=empresasText.concat("'");
            var empresasText=empresasText.concat(",");
            
        }
        var empresasText=empresasText.slice(0,-1);
        var empresasText=empresasText.concat(")");
    
        var habilidadesText="( ";
        for(i in req.body.habilidades){
            var habilidadesText=habilidadesText.concat("'");
            var habilidadesText=habilidadesText.concat(req.body.habilidades[i].toLowerCase());
            var habilidadesText=habilidadesText.concat("'");
            var habilidadesText=habilidadesText.concat(",");
            
        }
    
        var habilidadesText=habilidadesText.slice(0,-1);
        var habilidadesText=habilidadesText.concat(")");
    
    
    //empleoid, titulo, descrpcion, empresaid, nombrecomercial, status, ciudad, estado, habilidades
        if(habilidadesText==="()" && empresasText==="()"){
            db.any(`SELECT empleo.empleoID, empleo.titulo, empleo.descripcion,empleo.postDate,
            empresa.empresaID, empresa.nombreComercial, empresa.estadoCuenta, empresa.ciudad, empresa.estado FROM empleo JOIN empresa ON empleo.empresaID=empresa.empresaID
            JOIN habilidadesDeEmpleo ON empleo.empleoID=habilidadesDeEmpleo.empleoID JOIN habilidades ON habilidadesDeEmpleo.habilidadID= habilidades.habilidadID
            WHERE LOWER(empleo.titulo) LIKE '%${req.body.titulo.toLowerCase()}%';`, [true])
            .then(data => {
                //si encuentra los datos, los manda
                var finalData=data;
                var habilidadesArr=[];
                var sentData=false;
                if(finalData.lengt===0){
                    res.send(finalData);
                    sentData=true;
                }
                for(i in finalData){
                    var completed=false;
                    db.any(`SELECT * FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID
                    WHERE empleoID=${finalData[i].empleoid}`,[i])
                    .then(data2=>{
                        habilidadesArr.push(data2);
                        if(habilidadesArr.length===finalData.length){
                            //console.log(habilidadesArr);
                            for(j in finalData){
                                finalData[j].habilidades=habilidadesArr[j];
                            }
                            var dataToSend=[];
                            var idDeEmpleos=[];
                            for(i in finalData){
                                if(!idDeEmpleos.includes(finalData[i].empleoid)){
                                    dataToSend.push(finalData[i]);
                                    idDeEmpleos.push(finalData[i].empleoid);
                    
                                }
                            }
                            if(!sentData){
                                res.send(dataToSend);
                            }
                            
    
                        }
                    });
                    
                }
    
                
            })
            .catch(error => {
                //si hay un error con el select, lo imprime y lo regresa
                console.log('ERROR:', error);
                res.send(error);
            });
        }else if (habilidadesText==="()"){
            db.any(`SELECT empleo.empleoID, empleo.titulo, empleo.descripcion,empleo.postDate,
            empresa.empresaID, empresa.nombreComercial, empresa.estadoCuenta, empresa.ciudad, empresa.estado FROM empleo JOIN empresa ON empleo.empresaID=empresa.empresaID
            JOIN habilidadesDeEmpleo ON empleo.empleoID=habilidadesDeEmpleo.empleoID JOIN habilidades ON habilidadesDeEmpleo.habilidadID= habilidades.habilidadID
            WHERE LOWER(empresa.nombreComercial) IN ${empresasText}
            AND LOWER(empleo.titulo) LIKE '%${req.body.titulo.toLowerCase()}%';`, [true])
            .then(data => {
                //si encuentra los datos, los manda
                var finalData=data;
                var habilidadesArr=[];
                var sentData=false;
                if(finalData.length===0){
                    res.send(finalData)
                    sentData=true;
                }
    
                for(i in finalData){
                    var completed=false;
                    db.any(`SELECT * FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID
                    WHERE empleoID=${finalData[i].empleoid}`,[i])
                    .then(data2=>{
                        habilidadesArr.push(data2);
                        if(habilidadesArr.length===finalData.length){
                            //console.log(habilidadesArr);
                            for(j in finalData){
                                finalData[j].habilidades=habilidadesArr[j];
                            }
                            var dataToSend=[];
                            var idDeEmpleos=[];
                            for(i in finalData){
                                if(!idDeEmpleos.includes(finalData[i].empleoid)){
                                    dataToSend.push(finalData[i]);
                                    idDeEmpleos.push(finalData[i].empleoid);
                    
                                }
                            }
                            if(!sentData){
                                res.send(dataToSend);
                            }
                            
    
                        }
                    });
                    
                }
                
            })
            .catch(error => {
                //si hay un error con el select, lo imprime y lo regresa
                console.log('ERROR:', error);
                res.send(error);
            });
        }else if(empresasText==="()"){
            db.any(`SELECT empleo.empleoID, empleo.titulo, empleo.descripcion,empleo.postDate,
            empresa.empresaID, empresa.nombreComercial, empresa.estadoCuenta, empresa.ciudad, empresa.estado FROM empleo JOIN empresa ON empleo.empresaID=empresa.empresaID
            JOIN habilidadesDeEmpleo ON empleo.empleoID=habilidadesDeEmpleo.empleoID JOIN habilidades ON habilidadesDeEmpleo.habilidadID= habilidades.habilidadID
            WHERE LOWER(habilidades.nombre) IN ${habilidadesText}
            AND LOWER(empleo.titulo) LIKE '%${req.body.titulo.toLowerCase()}%';`, [true])
            .then(data => {
                //si encuentra los datos, los manda
                var finalData=data;
                var habilidadesArr=[];
                var sentData=false;
                if(finalData.length===0){
                    res.send(finalData)
                    sentData=true;
                }
                for(i in finalData){
                    var completed=false;
                    db.any(`SELECT * FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID
                    WHERE empleoID=${finalData[i].empleoid}`,[i])
                    .then(data2=>{
                        habilidadesArr.push(data2);
                        if(habilidadesArr.length===finalData.length){
                            //console.log(habilidadesArr);
                            for(j in finalData){
                                finalData[j].habilidades=habilidadesArr[j];
                            }
                            var dataToSend=[];
                            var idDeEmpleos=[];
                            for(i in finalData){
                                if(!idDeEmpleos.includes(finalData[i].empleoid)){
                                    dataToSend.push(finalData[i]);
                                    idDeEmpleos.push(finalData[i].empleoid);
                    
                                }
                            }
                            if(!sentData){
                                res.send(dataToSend);
                            }
    
                        }
                    });
                    
                }    
            })
            .catch(error => {
                //si hay un error con el select, lo imprime y lo regresa
                console.log('ERROR:', error);
                res.send(error);
            });
        }else{
            db.any(`SELECT empleo.empleoID, empleo.titulo, empleo.descripcion,empleo.postDate,
            empresa.empresaID, empresa.nombreComercial, empresa.estadoCuenta, empresa.ciudad, empresa.estado FROM empleo JOIN empresa ON empleo.empresaID=empresa.empresaID
            JOIN habilidadesDeEmpleo ON empleo.empleoID=habilidadesDeEmpleo.empleoID JOIN habilidades ON habilidadesDeEmpleo.habilidadID= habilidades.habilidadID
            WHERE LOWER(habilidades.nombre) IN ${habilidadesText}
            AND LOWER(empresa.nombreComercial) IN ${empresasText}
            AND LOWER(empleo.titulo) LIKE '%${req.body.titulo.toLowerCase()}%';`, [true])
            .then(data => {
                //si encuentra los datos, los manda
                var finalData=data;
                var habilidadesArr=[];
                var sentData=false;
                if(finalData.length===0){
                    res.send(finalData)
                    sentData=true;
                }
                for(i in finalData){
                    var completed=false;
                    db.any(`SELECT * FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID
                    WHERE empleoID=${finalData[i].empleoid}`,[i])
                    .then(data2=>{
                        habilidadesArr.push(data2);
                        if(habilidadesArr.length===finalData.length){
                            //console.log(habilidadesArr);
                            for(j in finalData){
                                finalData[j].habilidades=habilidadesArr[j];
                            }
                            var dataToSend=[];
                            var idDeEmpleos=[];
                            for(i in finalData){
                                if(!idDeEmpleos.includes(finalData[i].empleoid)){
                                    dataToSend.push(finalData[i]);
                                    idDeEmpleos.push(finalData[i].empleoid);
                    
                                }
                            }
                            if(!sentData){
                                res.send(dataToSend);
                            }
                        }
                    });
                    
                }
                
            })
            .catch(error => {
                //si hay un error con el select, lo imprime y lo regresa
                console.log('ERROR:', error);
                res.send(error);
            });
        }
    
    });
    
    
app.put('/crearEmpleo',(req,res)=>{
    //empresaID el ID de la empresa, habilidades ([]) es un arreglo de IDs de las habilidades
    //Titulo es un string, descripcion es un string

    //insertamos en la tabla la info que se pasa como body a este post
    db.none(`INSERT INTO empleo(titulo, descripcion, empresaID, postDate)
    VALUES ('${req.body.titulo}', '${req.body.descripcion}',${req.body.empresaID},current_timestamp);`)    .then(data => {
        db.one(`SELECT MAX(empleoid) AS maxid FROM empleo;`, [true])
        .then(data => {
            //si encuentra los datos, los manda
            
            var currEmpleoId=data.maxid;
            sentData=false;
            if (req.body.habilidades.length===0){
                sentData=true;
                res.send({status: 201});
            }
            for(i in req.body.habilidades){
                db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID)
                VALUES(${req.body.habilidades[i]},${currEmpleoId});`);
            }
            if(!sentData){
                res.send({status: 201});
                sentData=true;
            }
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send({status: 404});
    });
});

app.delete('/borrarEmpleo',(req,res)=>{
    db.none(`DELETE FROM habilidadesDeEmpleo WHERE empleoID=${req.body.empleoID};`)    .then(data => {
        //si encuentra los datos, los manda
        db.none(`DELETE FROM empleo WHERE empleoID=${req.body.empleoID};`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 201});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
        
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send({status: 404});
    });
});

app.put('/updateEmpleo',(req,res)=>{
    /*
    Parametros:
    - empleoID
    - empresaID (el ID de la empresa que esta creando el empleo)
    - habilidades (un arreglo de los IDs de las habilidades relacionadas con el empleo)
    - titulo (un string que representa el titulo del empleo)
    - descripcion (un string que representa la descripcion del empleo)

    Output:
    - status 201 si todo bien, status 404 si no todo bien

    */

    //insertamos en la tabla la info que se pasa como body a este post
    db.none(`UPDATE empleo
    SET titulo='${req.body.titulo}',  descripcion='${req.body.descripcion}', postDate= current_timestamp
    WHERE empleoID=${req.body.empleoID};`)    .then(data => {
        db.none(`DELETE FROM habilidadesDeEmpleo WHERE empleoID=${req.body.empleoID};`, [true])
        .then(data => {
            sentData=false;
            if (req.body.habilidades.length===0){
                sentData=true;
                res.send({status: 201});
            }
            for(i in req.body.habilidades){
                db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID)
                VALUES(${req.body.habilidades[i]},${req.body.empleoID});`);
            }
            if(!sentData){
                res.send({status: 201});
                sentData=true;
            }

            

        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send({status: 404});
    });
});


app.put('/updateUsuario',(req,res)=>{
    /*
vamos a tener que agarrar username al inicio desde correo

    Parametros:
    email
    nombre
    apellido
    rolActual
    correoContacto
    telefonoContacto
    linkedinContacto
    githubContacto
    biografia

    habilidades (lista de objetos json){
        habilidadID
        tiempoExperiencia
    }

    experiencias (lista de objetos json){
        titulo,
        empresa
        fechaInicio
        fechaFin (puede ser null)
    }

    educaciones (lista de objetos json){
        tipoEducacion
        titulo
        escuela
        fechaInicio
        fechaFin

    }

    */

    db.one(`SELECT username FROM usuario WHERE correoCuenta='${req.body.email}';`, [true])
    .then(data => {
        //si encuentra los datos, los manda
        const username= data.username;
        
        
        db.none(`UPDATE usuario
        SET nombre='${req.body.nombre}', apellido='${req.body.apellido}', rolActual='${req.body.rolActual}',
        correoContacto='${req.body.correoContacto}',telefonoContacto='${req.body.telefonoContacto}',linkedinContacto='${req.body.linkedinContacto}',githubContacto='${req.body.githubContacto}',
        biografia='${req.body.biografia}' WHERE username='${username}';`);

        db.none(`DELETE FROM habilidadesDeUsuario WHERE username='${username}';`,[true]).then(data=>{
            for(i in req.body.habilidades){
                db.none(`INSERT INTO habilidadesDeUsuario(habilidadID, username, tiempoExperiencia)
                VALUES(${req.body.habilidades[i].habilidadID}, '${username}', ${req.body.habilidades[i].tiempoExperiencia});`);
            }
        });
        res.send({status:200});
        
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        res.send({status:404});
    });
});

app.get('/buscarUsuarios',(req,res)=>{
/*
Parametros:
{
    "name":"",
    "habilidades":[],
    "ciudad":"",
    "estado":""
}

name (string que representa el nombre a buscar)
habilidades (lista de objetos json con nombre de la habilidad y tiempoexperiencia){
        "nombre":"javascript",
        "tiempoexperiencia":null
    }
ciudad (string que representa la ciudad)
estado (string que representa el estado)

Output
lista de objetos json con la informacion de usuario y las habilidades del mismo (lista de jsons con la info de las habildades)
*/
var habilidadesText="(";
for(i in req.body.habilidades){
    if(req.body.habilidades[i].tiempoexperiencia!=null && req.body.habilidades[i].tiempoexperiencia!=0){
        var habilidadesText=habilidadesText.concat(` (LOWER(habilidades.nombre)='${req.body.habilidades[i].nombre.toLowerCase()}' AND habilidadesDeUsuario.tiempoexperiencia>=${req.body.habilidades[i].tiempoexperiencia})`);

    }
    else{
        var habilidadesText=habilidadesText.concat(` (LOWER(habilidades.nombre)='${req.body.habilidades[i].nombre.toLowerCase()}')`);
    }
    var habilidadesText=habilidadesText.concat(" OR");
    
}


var habilidadesText=habilidadesText.slice(0,-2);
var habilidadesText=habilidadesText.concat(")");


if(req.body.habilidades.length>=1){
    db.any(`SELECT usuario.username, usuario.nombre, usuario.apellido, usuario.rolActual, usuario.biografia, usuario.linkedinContacto, usuario.githubContacto, usuario.correoContacto, usuario.ciudad, usuario.estado
    FROM habilidadesDeUsuario JOIN usuario ON habilidadesDeUsuario.username=usuario.username JOIN habilidades ON habilidadesDeUsuario.habilidadID=habilidades.habilidadID
    WHERE ${habilidadesText}
    AND CONCAT(LOWER(usuario.nombre), ' ', LOWER(usuario.apellido)) LIKE '%${req.body.name.toLowerCase()}%'
    AND LOWER(usuario.ciudad) LIKE '%${req.body.ciudad.toLowerCase()}%'
    AND LOWER(usuario.estado) LIKE '%${req.body.estado.toLowerCase()}%';`,[true]).then(data=>{
        var finalData=data;
        var habilidadesArr=[];
        var sentData=false;
        if(finalData.length===0){
            sentData=true;
            res.send(finalData);
        }
        for(i in finalData){
            var completed=false;
            db.any(`SELECT * FROM habilidadesDeUsuario JOIN habilidades ON habilidadesDeUsuario.habilidadID=habilidades.habilidadID
            WHERE username='${finalData[i].username}'`,[i])
            .then(data2=>{
                habilidadesArr.push(data2);
                if(habilidadesArr.length===finalData.length){
                    //console.log(habilidadesArr);
                    for(j in finalData){
                        finalData[j].habilidades=habilidadesArr[j];
                    }
                    if(!sentData){
                        res.send(finalData);
                    }
                }
            });
            
        }
    });
}else{
    db.any(`SELECT usuario.username, usuario.nombre, usuario.apellido, usuario.rolActual, usuario.biografia, usuario.linkedinContacto, usuario.githubContacto, usuario.correoContacto, usuario.ciudad, usuario.estado
    FROM usuario
    WHERE CONCAT(LOWER(usuario.nombre), ' ', LOWER(usuario.apellido)) LIKE '%${req.body.name.toLowerCase()}%'
    AND LOWER(usuario.ciudad) LIKE '%${req.body.ciudad.toLowerCase()}%'
    AND LOWER(usuario.estado) LIKE '%${req.body.estado.toLowerCase()}%';`,[true]).then(data=>{
        var finalData=data;
        var habilidadesArr=[];
        var sentData=false;
        console.log(data);
        if(finalData.length===0){
            sentData=true;
            res.send(finalData);
        }
        for(i in finalData){
            var completed=false;
            db.any(`SELECT * FROM habilidadesDeUsuario JOIN habilidades ON habilidadesDeUsuario.habilidadID=habilidades.habilidadID
            WHERE username='${finalData[i].username}'`,[i])
            .then(data2=>{
                habilidadesArr.push(data2);
                if(habilidadesArr.length===finalData.length){
                    //console.log(habilidadesArr);
                    for(j in finalData){
                        finalData[j].habilidades=habilidadesArr[j];
                    }
                    if(!sentData){
                        res.send(finalData);
                    }
                }
            });
            
        }
    });

}




});

app.get('/habilidadesDeUsuario', (req,res)=>{
    db.any('SELECT * FROM habilidadesDeUsuario;', [true])
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

app.get('/habilidades', (req,res)=>{
    db.any('SELECT * FROM habilidades;', [true])
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

app.get('/habilidadesDeEmpleo', (req,res)=>{
    db.any('SELECT * FROM habilidadesDeEmpleo;', [true])
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

app.get('/empleos', (req,res)=>{
    db.any('SELECT * FROM empleo;', [true])
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