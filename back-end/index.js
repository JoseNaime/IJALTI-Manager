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
    descripcion VARCHAR(2555),
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

app.put('/pruebaBlob',(req,res)=>{
    db.none(`UPDATE usuario SET cv=${req.body.miblob} WHERE username='severia';`).then(data=>{
        res.send({status:201});
    }).catch(error=>{
        res.send({status:404, err:error});
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
            res.send({status: 404});
        });
    }
    else if(req.body.tipoCuenta=='empresa'){
        //insertamos en la tabla la info que se pasa como body a este post
        db.none(`INSERT INTO empresa(nombreComercial, nombreFiscal, correoCuenta, telefonoContacto, estado, ciudad, estadoCuenta)
         VALUES ('${req.body.data.nombreComercial}', '${req.body.data.nombreFiscal}','${req.body.data.correoCuenta}','${req.body.data.telefonoContacto}','${req.body.data.estado}','${req.body.data.ciudad}','Pendiente');`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 201});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
    }else{
        res.send({status: 404});
    }

});


app.delete('/account', (req,res)=>{
    if(req.body.rol=='usuario'){

        db.one(`SELECT username FROM usuario WHERE correoCuenta='${req.body.email}';`)    .then(data => {
            var username=data.username;
            db.none(`DELETE FROM habilidadesDeUsuario WHERE username='${username}';`)    .then(data2 => {
                db.none(`DELETE FROM educacion WHERE username='${username}';`)    .then(data3 => {
                    db.none(`DELETE FROM experiencia WHERE username='${username}';`)    .then(data4 => {
                        db.none(`DELETE FROM aplicacion WHERE username='${username}';`)    .then(data5 => {
                            db.none(`DELETE FROM usuario WHERE username='${username}';`)    .then(data6 => {
                                res.send({status:200});
                            });
                        });
                    });
                });
            });
       })
       .catch(error => {
           //si hay un error con el select, lo imprime y lo regresa
           console.log('ERROR:', error);
           res.send({status: 404});
       });
    }else if(req.body.rol=='empresa'){
        db.one(`SELECT empresaID FROM empresa WHERE correoCuenta='${req.body.email}';`)    .then(data => {
            var empresaID=data.empresaid;
            db.any(`SELECT empleo.empleoID FROM aplicacion JOIN empleo ON aplicacion.empleoID=empleo.empleoID
            WHERE empleo.empresaID=${empresaID};`)    .then(data2 => {
                var empleoIDText="( ";
                var empleosIDs=[];
                for(i in data2){
                    if (!(empleosIDs.includes(data2[i].empleoid))){
                        empleoIDText=empleoIDText.concat(data2[i].empleoid.toString())
                        empleoIDText=empleoIDText.concat(',');
                        empleosIDs.push(data2[i].empleoid);
                    }
                }
                empleoIDText=empleoIDText.slice(0,-1);
                empleoIDText=empleoIDText.concat(')');
                console.log(empleoIDText);
                
                db.none(`DELETE FROM habilidadesDeEmpleo WHERE empleoID IN ${empleoIDText};`).then(data3=>{
                    db.none(`DELETE FROM aplicacion WHERE empleoID IN ${empleoIDText};`).then(data4=>{
                        db.none(`DELETE FROM empleo WHERE empleoID IN ${empleoIDText};`).then(data5=>{
                            db.none(`DELETE FROM empresa WHERE empresaID=${empresaID};`).then(data6=>{
                                res.send({status:200});
                            });
                        });
                    });
                });
                
            });
       })
       .catch(error => {
           //si hay un error con el select, lo imprime y lo regresa
           console.log('ERROR:', error);
           res.send({status: 404});
       });
    }else if(req.body.rol=='admin'){
        db.none(`DELETE FROM admin WHERE correo='${req.body.email}';`)    .then(data => {
            //si encuentra los datos, los manda
            res.send({status: 200});
        })
        .catch(error => {
            //si hay un error con el select, lo imprime y lo regresa
            console.log('ERROR:', error);
            res.send({status: 404});
        });
    }else{
        res.send({status:400});
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
     WHERE usuario.correoCuenta='${req.query.email}';`, [true])
    .then(data => {
        //si encuentra los datos, los manda
        var finalData=data;
        var habilidadesTotales=0;
        for(i in finalData){
            var completed=false;
            db.any(`SELECT habilidadesDeEmpleo.empleoID, habilidades.habilidadID, habilidades.nombre, habilidades.color, habilidadesDeEmpleo.tiempoExperiencia FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID WHERE empleoID=${finalData[i].empleoid}`,[i])
            .then(data2=>{
                if(data2.length>=1){
                    for(i in finalData){
                        if(finalData[i].empleoid===data2[0].empleoid){
                            finalData[i].habilidades=data2;
                            habilidadesTotales+=1;
                        }
                    }
                }else{
                    habilidadesTotales+=1;
                }

                if(habilidadesTotales===finalData.length){
                    //console.log(habilidadesArr);
                    for(j in finalData){
                        if(!("habilidades" in finalData[j])){
                            finalData[j].habilidades=[];
                        }
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
    var habilidadesText="( ";
    var searchTitle="";
    if(Object.keys(req.query).length!=0){
        if(typeof req.query.empresas!='string'){

            for(i in req.query.empresas){
                var empresasText=empresasText.concat("'");
                var empresasText=empresasText.concat(req.query.empresas[i].toLowerCase());
                var empresasText=empresasText.concat("'");
                var empresasText=empresasText.concat(",");
                
            }
            var empresasText=empresasText.slice(0,-1);
            var empresasText=empresasText.concat(")");
      }else{
        var empresasText=empresasText.concat("'");
        var empresasText=empresasText.concat(req.query.empresas.toLowerCase());
        var empresasText=empresasText.concat("'");
        var empresasText=empresasText.concat(")");

      }
      if(typeof req.query.habilidades!='string'){
            var habilidadesText="( ";
            for(i in req.query.habilidades){
                var habilidadesText=habilidadesText.concat("'");
                var habilidadesText=habilidadesText.concat(req.query.habilidades[i].toLowerCase());
                var habilidadesText=habilidadesText.concat("'");
                var habilidadesText=habilidadesText.concat(",");
                
            }

            var habilidadesText=habilidadesText.slice(0,-1);
            var habilidadesText=habilidadesText.concat(")");
      }else{
        var habilidadesText=habilidadesText.concat("'");
        var habilidadesText=habilidadesText.concat(req.query.habilidades.toLowerCase());
        var habilidadesText=habilidadesText.concat("'");
        var habilidadesText=habilidadesText.concat(")");
      }

        searchTitle=req.query.titulo.toLowerCase()

    }
    else{
        habilidadesText="()";
        empresasText="()";
    }


//empleoid, titulo, descrpcion, empresaid, nombrecomercial, status, ciudad, estado, habilidades
    if(habilidadesText==="()" && empresasText==="()"){
        
        db.any(`SELECT DISTINCT empleo.empleoID, empleo.titulo, empleo.descripcion,empleo.postDate,
        empresa.empresaID, empresa.nombreComercial, empresa.estadoCuenta, empresa.ciudad, empresa.estado FROM empleo JOIN empresa ON empleo.empresaID=empresa.empresaID
        JOIN habilidadesDeEmpleo ON empleo.empleoID=habilidadesDeEmpleo.empleoID JOIN habilidades ON habilidadesDeEmpleo.habilidadID= habilidades.habilidadID
        WHERE LOWER(empleo.titulo) LIKE '%${searchTitle}%';`, [true])
        .then(data => {
            //si encuentra los datos, los manda
            var finalData=data;
            var habilidadesTotales=0;
            var sentData=false;
            if(finalData.length===0){
                res.send(finalData);
                sentData=true;
            }
            for(i in finalData){
                db.any(`SELECT * FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID
                WHERE empleoID=${finalData[i].empleoid}`,[i])
                .then(data2=>{
                    if(data2.length>=1){
                        var currEmpleoID=data2[0].empleoid;
                        for(k in finalData){
                            if(finalData[k].empleoid===currEmpleoID){
                                finalData[k].habilidades=data2;
                                habilidadesTotales+=1;
                            }
                        }
                    }else{
                        habilidadesTotales+=1;
                    }
                    if(habilidadesTotales===finalData.length){
                        for(j in finalData){
                            if(!("habilidades"  in finalData[j])){
                                finalData[j].habilidades=[];
                            }
                        }
                        if(!sentData){
                            var dataToSend=[];
                            var empleos=[];
                            for(k in finalData){
                                if(!(empleos.includes(finalData[k].empleoid) )){
                                    dataToSend.push(finalData[k]);
                                    empleos.push(finalData[k].empleoid);
                                }
                            }
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
        AND LOWER(empleo.titulo) LIKE '%${searchTitle}%';`, [true])
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
                    if(habilidadesArr.length===finalData.length && !sentData){
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

                        res.send(dataToSend);
                        
                        

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
        AND LOWER(empleo.titulo) LIKE '%${searchTitle}%';`, [true])
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
        AND LOWER(empleo.titulo) LIKE '%${searchTitle}%';`, [true])
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
    /*
    Parametros:
    titulo
    descripcion
    empresaID
    habilidades{
        habiliadid
        tiempoexperiencia
    }

  {
    "titulo":"GOLANG Developer",
    "descripcion":"Hacer cosas concurrentes con el lenguaje GO",
    "empresaID":3,
    "habilidades":[{
        "habilidadid":6,
        "tiempoexperiencia":3
    }
    ]
}

    Output:
    status 201 o 404

    */
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
                db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID, tiempoExperiencia)
                VALUES(${req.body.habilidades[i].habilidadid},${currEmpleoId},${req.body.habilidades[i].tiempoexperiencia});`);
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
            db.none(`UPDATE aplicacion SET status='closed' WHERE epleoID=${req.body.empleoID};`)
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
    - habilidades (un arreglo de los JSON de las habilidades relacionadas con el empleo){
        habilidadid
        tiempoexperiencia
    }
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
                db.none(`INSERT INTO habilidadesDeEmpleo(habilidadID, empleoID, tiempoExperiencia)
                VALUES(${req.body.habilidades[i].habilidadid},${req.body.empleoID}, ${req.body.habilidades[i].tiempoexperiencia});`);
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

    Output:
    Status 201 o 404

    */

    db.one(`SELECT username FROM usuario WHERE correoCuenta='${req.body.email}';`, [true])
    .then(data => {
        const username= data.username;
        //Update de la informacion del usuario
        db.none(`UPDATE usuario
        SET nombre='${req.body.nombre}', apellido='${req.body.apellido}', rolActual='${req.body.rolActual}',
        correoContacto='${req.body.correocontacto}',telefonoContacto='${req.body.telefonocontacto}',linkedinContacto='${req.body.linkedincontacto}',githubContacto='${req.body.githubcontacto}',
        biografia='${req.body.biografia}' WHERE username='${username}';`);

        //update de las habilidades relacionadas al usuario
        db.none(`DELETE FROM habilidadesDeUsuario WHERE username='${username}';`,[true]).then(data=>{
            for(i in req.body.habilidades){
                db.none(`INSERT INTO habilidadesDeUsuario(habilidadID, username, tiempoExperiencia)
                VALUES(${req.body.habilidades[i].habilidadid}, '${username}', ${req.body.habilidades[i].tiempoexperiencia});`);
            }
        });
    
       //update de las experiencias relacionadas al usuario
        db.none(`DELETE FROM experiencia WHERE username='${username}';`,[true]).then(data=>{
            for(j in req.body.experiencias){
                if(req.body.experiencias[j].fechaFin!=null){
                    db.none(`INSERT INTO experiencia(username, titulo, empresa, fechaInicio, fechaFin)
                    VALUES('${username}', '${req.body.experiencias[j].titulo}','${req.body.experiencias[j].empresa}',
                    '${req.body.experiencias[j].fechainicio}','${req.body.experiencias[j].fechafin}');`);
                }else{
                    db.none(`INSERT INTO experiencia(username, titulo, empresa, fechaInicio)
                    VALUES('${username}', '${req.body.experiencias[j].titulo}','${req.body.experiencias[j].empresa}',
                    '${req.body.experiencias[j].fechainicio}');`);
                }
                }
        });

        //update de las educaciones relacionadas al usuario
        db.none(`DELETE FROM educacion WHERE username='${username}';`,[true]).then(data=>{
            for(k in req.body.educaciones){
                if(req.body.educaciones[k].fechaFin!=null){
                    db.none(`INSERT INTO educacion(username, tipoEducacion, titulo, escuela, fechaInicio, fechaFin)
                    VALUES('${username}', '${req.body.educaciones[k].tipoeducacion}','${req.body.educaciones[k].titulo}',
                    '${req.body.educaciones[k].escuela}','${req.body.educaciones[k].fechainicio}', '${req.body.educaciones[k].fechafin}');`); 
                }else{
                    db.none(`INSERT INTO educacion(username, tipoEducacion, titulo, escuela, fechaInicio)
                    VALUES('${username}', '${req.body.educaciones[k].tipoeducacion}','${req.body.educaciones[k].titulo}',
                    '${req.body.educaciones[k].escuela}','${req.body.educaciones[k].fechainicio}');`); 
                }
                }
        });

        


        res.send({status:200});
        
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        res.send({status:404});
    });
});

app.put('/updateEmpresa',(req,res)=>{
    /*
    Parametros:
    - empresaID
    - nombreComercial
    - nombreFiscal
    - correoContacto
    - telefonoContacto
    - paginaWeb
    - ciudad
    - estado
    - domicilio
    - documentoAprobacion

    Output:
    - status 201 si todo bien, status 404 si no todo bien
    */

    //insertamos en la tabla la info que se pasa como body a este post
    db.none(`UPDATE empresa
    SET nombreComercial='${req.body.nombreComercial}',  nombreFiscal='${req.body.nombreFiscal}', correoContacto = '${req.body.correoContacto}',
    telefonoContacto = '${req.body.telefonoContacto}', paginaWeb = '${req.body.paginaWeb}', ciudad = '${req.body.ciudad}', estado = '${req.body.estado}',
    domicilio = '${req.body.domicilio}', documentoAprobacion = '${req.body.documentoAprobacion}'
    WHERE empresaID=${req.body.empresaID};`)    .then(data => {
        res.send({status: 201});
    })
    .catch(error => {
        //si hay un error con el select, lo imprime y lo regresa
        console.log('ERROR:', error);
        res.send({status: 404});
    });
});


app.get('/buscarUsuarios',(req,res)=>{
/*
Parametros
name
habilidades (lista de JSONs){
    nombre
    tiempoexperiencia
}
ciudad
estado

Output
Lista de JSONs con la info
    {
        "username": "severia",
        "nombre": "Santiago",
        "apellido": "Reyes",
        "rolactual": "undefined",
        "biografia": "null",
        "linkedincontacto": "null",
        "githubcontacto": "null",
        "correocontacto": "null",
        "ciudad": "Guadalajara",
        "estado": "Jalisco",
        "habilidades": [
            {
                "habilidadid": 3,
                "username": "severia",
                "tiempoexperiencia": null,
                "nombre": "JavaScript",
                "color": "#FFF8BE",
                "nombrelogo": null
            },
            {
                "habilidadid": 2,
                "username": "severia",
                "tiempoexperiencia": 3,
                "nombre": "Python",
                "color": "#FFD43B",
                "nombrelogo": null
            }
        ]
    }
*/
    var habilidades=[];
    for(i in req.query.habilidades){
        habilidades.push(JSON.parse(req.query.habilidades[i]));
    }
    var habilidadesText="( ";
    var searchName="";
    var searchCiudad="";
    var searchEstado="";

    if(Object.keys(req.query).length!=0){

        for(i in habilidades){
            if(habilidades[i].tiempoexperiencia!=null && habilidades[i].tiempoexperiencia!=0){
                var habilidadesText=habilidadesText.concat(` (LOWER(habilidades.nombre)='${habilidades[i].nombre.toLowerCase()}' AND habilidadesDeUsuario.tiempoexperiencia>=${habilidades[i].tiempoexperiencia})`);
    
            }
            else{
                var habilidadesText=habilidadesText.concat(` (LOWER(habilidades.nombre)='${habilidades[i].nombre.toLowerCase()}')`);
            }
            var habilidadesText=habilidadesText.concat(" OR");        
        }
    
        var habilidadesText=habilidadesText.slice(0,-2);
        var habilidadesText=habilidadesText.concat(")");
        

        searchName=req.query.name.toLowerCase();
        searchCiudad=req.query.ciudad.toLowerCase();
        searchEstado=req.query.estado.toLowerCase();



        }
    else{
        habilidadesText="()";
    }


    if(habilidades.length>=1){
        db.any(`SELECT usuario.username, usuario.nombre, usuario.apellido, usuario.rolActual, usuario.biografia, usuario.linkedinContacto, usuario.githubContacto, usuario.correoContacto, usuario.ciudad, usuario.estado
        FROM habilidadesDeUsuario JOIN usuario ON habilidadesDeUsuario.username=usuario.username JOIN habilidades ON habilidadesDeUsuario.habilidadID=habilidades.habilidadID
        WHERE ${habilidadesText}
        AND CONCAT(LOWER(usuario.nombre), ' ', LOWER(usuario.apellido)) LIKE '%${searchName}%'
        AND LOWER(usuario.ciudad) LIKE '%${searchCiudad}%'
        AND LOWER(usuario.estado) LIKE '%${req.body.estado.toLowerCase()}%';`,[true]).then(data=>{
            var finalData=data;
            var habilidadesTotales=0;
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
                    if(data2.length>=1){
                        currUsername=data2[0].username;
                        for(k in finalData){
                            if(finalData[k].username===currUsername){
                                finalData[k].habilidades=data2;
                                habilidadesTotales+=1;
                            }
                        }
                    }else{
                        habilidadesTotales+=1;
                    }
                    if(habilidadesTotales===finalData.length){
                        //console.log(habilidadesArr);
                        for(j in finalData){
                            if(!("habilidades"  in finalData[j])){
                                finalData[j].habilidades=[];
                            }
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
        WHERE CONCAT(LOWER(usuario.nombre), ' ', LOWER(usuario.apellido)) LIKE '%${searchName}%'
        AND LOWER(usuario.ciudad) LIKE '%${searchCiudad}%'
        AND LOWER(usuario.estado) LIKE '%${searchEstado}%';`,[true]).then(data=>{
            var finalData=data;
            var habilidadesTotales=0;
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
                    if(data2.length>=1){
                        currUsername=data2[0].username;
                        for(k in finalData){
                            if(finalData[k].username===currUsername){
                                finalData[k].habilidades=data2;
                                habilidadesTotales+=1;
                            }
                        }
                    }else{
                        habilidadesTotales+=1;
                    }
                    if(habilidadesTotales===finalData.length){
                        //console.log(habilidadesArr);
                        for(j in finalData){
                            if(!("habilidades"  in finalData[j])){
                                finalData[j].habilidades=[];
                            }
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


app.put('/nuevaHabilidad',(req,res)=>{
    /*
    Parametros
    - nombre (string de la habilidad a insertar)
    - color (string del codigo hexadecimal que va a representar la habilidad)

    Output
    status 201 si todo bien, 404 si todo mal
    */

    db.none(`INSERT INTO habilidades(nombre,color)
    VALUES ('${req.body.nombre}', '${req.body.color}');`).then(data=>{
        res.send({status:201});
    }).catch(error=>{
        res.send({status:404});
    });

    
});

app.get('/userInfo',(req,res)=>{
    /*
    Parametros
    - email (string del correo del usuario)

    Output
    - El objeto todo grandote del usuario (el mismo que se usa de input para /updateUsuario)

    Ej:
{
    "email": "severia@google.com",
    "nombre": "Santiago",
    "apellido": "Reyes",
    "correocontacto": "null",
    "telefonocontacto": "null",
    "linkedincontacto": "null",
    "githubcontacto": "null",
    "biografia": "null",
    "habilidades": [
        {
            "habilidadid": 2,
            "tiempoexperiencia": 3,
            "nombre": "Python",
            "color": "#FFD43B"
        },
        {
            "habilidadid": 3,
            "tiempoexperiencia": null,
            "nombre": "JavaScript",
            "color": "#FFF8BE"
        }
    ],
    "experiencias": [
        {
            "titulo": "Data Science/Engineering Metee",
            "empresa": "Meta",
            "fechainicio": "2022-03-01T06:00:00.000Z",
            "fechafin": null
        }
    ],
    "educaciones": [
        {
            "tipoeducacion": "Carrera",
            "titulo": "Ingenieria en Tecnologias Computacionales",
            "escuela": "Tec de Monterrey",
            "fechainicio": "2020-08-01T05:00:00.000Z",
            "fechafin": null
        }
    ]
}
    */

    db.one(`SELECT username FROM usuario WHERE correoCuenta='${req.query.email}';`, [true])
    .then(data => {
        const username= data.username;
        
        db.one(`SELECT correoCuenta AS email, nombre, apellido, correoContacto, telefonoContacto, linkedinContacto, githubContacto, biografia FROM usuario WHERE username='${username}';`,[true])
        .then(dataUsuario=>{
            var finalData=dataUsuario;
            db.any(`SELECT habilidades.habilidadID, tiempoExperiencia, nombre, color FROM habilidadesDeUsuario JOIN habilidades ON habilidadesDeUsuario.habilidadID=habilidades.habilidadID
            WHERE username='${username}'`,[true])
            .then(dataHabilidades=>{
                finalData.habilidades=dataHabilidades;
                db.any(`SELECT titulo, empresa, fechaInicio, fechaFin FROM experiencia
                WHERE username='${username}';`,[true])
                .then(dataExperiencia=>{
                    finalData.experiencias=dataExperiencia;
                    db.any(`SELECT tipoEducacion, titulo, escuela, fechaInicio, fechaFin FROM educacion
                    WHERE username='${username}'`,[true])
                    .then(dataEducacion=>{
                        finalData.educaciones=dataEducacion;
                        res.send(finalData);
                        
                    }); 
                }); 
            }); 
        });
    });
});

app.get('/buscarEmpresas',(req,res)=>{
    /*
        Parametros
        nombre (string representando el nombre de la/las empresas a buscar, puede estar vacio)
        ciudad (string representado el nombre de la ciudad de interes)
        estado (string representando el nombre del estado de interes)
    
        Output
        empresaid
        nombrecomercial
        nombrefiscal
        estadocuenta
        correocuenta
        correcontacto
        telefonocontacto
        paginaweb
        ciudad
        estado
        domicilio
        domentoaprobacion
    
    
    */ 
    
        var searchNombre="";
        var searchCiudad="";
        var searchEstado="";
        if(Object.keys(req.query).length!=0){
            searchNombre=req.query.nombre.toLowerCase();
            searchCiudad=req.query.ciudad.toLowerCase();
            searchEstado=req.query.estado.toLowerCase();
        }
        db.any(`SELECT * FROM empresa
        WHERE (LOWER(nombreComercial) LIKE '${searchNombre}' OR LOWER(nombreFiscal) LIKE '%${searchNombre}%')
        AND LOWER(ciudad) LIKE '%${searchCiudad}%'
        AND LOWER(estado) LIKE '%${searchEstado}%';`).then(data=>{
            res.send(data);
        });
    });
    
app.get('/empresaInfo',(req,res)=>{
    /*
    Parametros:
    email (string del correo de la cuenta de empresa)

    Output:
    empresaid (int, id de la empresa)
    nombreComercial (string)
    estadocuenta (string del valor del estado de cuenta. Ej: Aprobada, en revision, etc)
    domicilio (string)
    ciudad (string)
    estado (string)
    descripcion (string)
    correocontacto (string)
    telefonocontacto (string)
    empleos (lista de objetos json que representan los empleos que la empresa ha publicado){
        empleoid (int, id del empleo)
        titulo (string)
        descripcion (string)
        postdate (date, string)
        solicitudes (string del numero de solicitudes/aplicaciones a este empleo)
    }
    */
    db.one(`SELECT empresaID, nombreComercial, estadoCuenta,paginaWeb,domicilio,ciudad,estado,descripcion, correoContacto, telefonoContacto FROM empresa WHERE correoCuenta='${req.query.email}';`, [true])
    .then(data => {
        const empresaid= data.empresaid;
        var finalData=data;
        db.any(`SELECT empleo.empleoID, empleo.titulo, empleo.descripcion, empleo.postDate, COUNT(*) AS solicitudes FROM empleo
        JOIN aplicacion ON empleo.empleoID=aplicacion.empleoID WHERE empleo.empresaID=${empresaid} GROUP BY empleo.empleoID`,[true])
        .then(dataEmpleos=>{
            finalData.empleos=dataEmpleos;
            res.send(finalData);
        }); 
    });
});


app.get('/empleosEmpresa',(req,res)=>{ 
    /*
    Parametros:
    email (string del correo de la cuenta de empresa)

    Output:
    lista de objetos JSON, cada uno representando un empleo{
        empleoID (int, id del empleo)
        titulo (string, titulo del empleo)
        descripcion (string, descripcion del empleo)
        postDate (date, string, dia en el que el empleo se publico)
        ciudad (string, ciudad de la empresa que publico el empleo)
        estado (string, estado de la empresa que publico el empleo)
        nombrecomercial (string, nombrecomercial de la empresa que publico el empleo)
        numsolicitues (string, cantidad de personas que han aplicado a el empleo)
        solicitudes (lista de objetos JSON que representan las solicitudes de usuarios para este empleo){
            status (string, estado de la aplicacion. Ej: Activa, Cerrada)
            aplicacionfecha (date, string, dia en el que la aplicacion para el empleo fue enviada por el usuario)
            nombre (string, nombre del aplicante)
            apellido (string, apellido del aplicante)
            rolactual (string, rolactual del aplicante)
            correocontacto (string, correo de contacto del aplicante)
            telefonocontacto (string, telefono de contacto del aplicante)
            username (string, username/identificador unico del aplicante)
            email (string, el correo con el que se creo la cuenta del aplicante)
            }

        habilidades (lista de objetos JSON que representan las habilidades del empleo){
            habilidadid (int, id de la habilidad)
            tiempoexperiencia (int, tiempo de experiencia que se requeire/prefiere para el empleo)
            nombre (string, nombre de la habilidad. Ej: "React")
            color (string, codigo hexadecimal que representa el color de la habilidad)
            nombrelogo (string, aun no se usa pero en teoria es para acceder al logo de la habilidad)
        }
    }

    */
    var searchEmail="";
    if(Object.keys(req.query).length!=0){
    searchEmail=req.query.email;
    }
    else{
    res.send([]);
    return;
    }
    db.one(`SELECT empresaID FROM empresa WHERE correoCuenta='${searchEmail}';`, [true])
    .then(data => {
        const empresaid= data.empresaid;
        db.any(`SELECT empleo.empleoID, empleo.titulo, empleo.descripcion, empleo.postDate, empresa.ciudad, empresa.estado, empresa.nombreComercial FROM empleo JOIN empresa ON empleo.empresaID=empresa.empresaID
        WHERE empleo.empresaID=${empresaid};`,[true])
        .then(dataEmpleos=>{
            var finalData=dataEmpleos;
            var aplicacionesTotales=0;
            var habildadesTotales=0;
            for(i in finalData){
                db.any(`SELECT  empleo.empleoID, aplicacion.status, aplicacion.aplicacionFecha, usuario.nombre, usuario.apellido, usuario.rolActual, usuario.correoContacto, usuario.telefonoContacto, usuario.username, usuario.correoCuenta AS email FROM aplicacion
                JOIN empleo ON empleo.empleoID=aplicacion.empleoID JOIN usuario ON aplicacion.username=usuario.username WHERE empleo.empleoID=${finalData[i].empleoid};`,[true])
                .then(dataAplicacion=>{
                    //console.log(dataAplicacion);
                    if(dataAplicacion.length>=1){
                        currEmpleoID=dataAplicacion[0].empleoid;
                        //console.log(dataAplicacion[0]);
                        aplicacionesTotales+=1;
                        for(j in finalData){
                            if(finalData[j].empleoid==currEmpleoID){
                                finalData[j].solicitudes=dataAplicacion;
                            }
                        }
                    }else{
                        aplicacionesTotales+=1;
                    }
                        
                    
                    if(aplicacionesTotales===finalData.length && habildadesTotales===finalData.length){
                        //console.log(finalData);
                        for(k in finalData){
                            if(!("solicitudes" in finalData[k])){
                                finalData[k].solicitudes=[];
                            }
                            if(!("habilidades" in finalData[k])){
                                finalData[k].habilidades=[];
                            }
                        }
                        res.send(finalData);
                    }
                    
                });
                
                db.any(`SELECT empleo.empleoID, habilidadesDeEmpleo.habilidadID, habilidadesDeEmpleo.tiempoExperiencia, habilidades.nombre, habilidades.color, habilidades.nombreLogo
                FROM habilidadesDeEmpleo JOIN habilidades ON habilidadesDeEmpleo.habilidadID=habilidades.habilidadID JOIN empleo ON habilidadesDeEmpleo.empleoID=empleo.empleoID
                WHERE empleo.empleoID=${finalData[i].empleoid}`,[true])
                .then(dataHabilidades=>{
                    if(dataHabilidades.length>=1){
                        currEmpleoID=dataHabilidades[0].empleoid;
                        //console.log(dataAplicacion[0]);
                        habildadesTotales+=1;
                        for(j in finalData){
                            if(finalData[j].empleoid==currEmpleoID){
                                finalData[j].habilidades=dataHabilidades;
                            }
                        }
                    }else{
                        habildadesTotales+=1;
                    }
                        
                    
                    if(aplicacionesTotales===finalData.length && habildadesTotales===finalData.length){
                        //console.log(finalData);
                        for(k in finalData){
                            if(!("solicitudes" in finalData[k])){
                                finalData[k].solicitudes=[];
                            }
                            if(!("habilidades" in finalData[k])){
                                finalData[k].habilidades=[];
                            }
                        }
                        res.send(finalData);
                    }
                    
                }); 
                
            }
            
        }); 
    });
});


app.put('/crearAplicacion', (req,res)=>{ 
    /*
    Parametros:
    email (string, correo del usuario que esta aplicando)
    empleoid (int, representa el empleo al que se esta aplicando)

    Output
    status 201 si todo bien, 404 y err si no todo bien (err es el error)
    */
    db.one(`SELECT username FROM usuario WHERE correoCuenta='${req.body.email}';`, [true])
    .then(data => {
        const username= data.username;
        db.any(`SELECT * FROM aplicacion WHERE empleoID=${req.body.empleoid} AND username='${username}';`).then(unusedData=>{
            if(unusedData.length==0){
                db.none(`INSERT INTO aplicacion(aplicacionFecha,status,empleoID,username)
                VALUES(current_timestamp,'active',${req.body.empleoid}, '${username}');`).then(newData=>{
                    res.send({status:201});
                });
            }
            else{
                res.send({status:404, message:"Already applied for this job"});
            }

        })

    }).catch(error=>{
        res.send({status:404, err:error});
    });
});

app.get('/empresasPendientes',(req,res)=>{
    /*
    Parametros:
    nada

    Output:
    toda la info de las empresas que tienen el estado de 'Pendiente'
    */
    db.any(`SELECT * FROM empresa WHERE estadoCuenta='Pendiente';`,[true]).then(data=>{
        res.send(data);
    });
});

app.put('/aprobarEmpresa',(req,res)=>{
    /*
    Parametros:
    nada

    Output:
    status 201 si todo bien, 404 y err si no todo bien (err es el error)
    */

    db.none(`UPDATE empresa SET estadoCuenta='Aprobada' WHERE empresaID=${req.query.empresaID};`).then(data=>{
        res.send({status:201});
    }).catch(error=>{
        res.send({status:404,err:error});
    });
});

app.get('/adminInfo', (req,res)=>{
    db.one(`SELECT * FROM admin WHERE correo='${req.query.email}';`).then(data=>{
        res.send(data);
    });
});

app.get('/aplicaciones', (req,res)=>{ //------------------------------------------------------------------------UPDATE
    db.any('SELECT * FROM aplicacion JOIN empleo ON aplicacion.empleoID=empleo.empleoID JOIN empresa ON empleo.empresaID=empresa.empresaID;', [true])
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