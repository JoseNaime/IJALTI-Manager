const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


//establecemos conexion con la base de datos postgreSQL (hosteado en heroku)
const pgp = require('pg-promise')();
const config ={
    user: "lcsrlhqxqrvwef",
    database: "db8lgl35pjnphr",
    password: "b3cfd02aaf1507176a5e3da83c052dda4dc8c77fbba6cb2c1a0d58a3ab03c7ce",
    port: 5432,
    host: "ec2-3-209-124-113.compute-1.amazonaws.com",
    ssl: { rejectUnauthorized: false }
}; 
const db = pgp(config);
db.connect();

//Probamos el select con los datos que estan en my_table
app.get('/trySelect',(req,res)=>{
    //se una .any, porque no estamos limitando la cantidad de respuestas
    db.any('SELECT * FROM my_table', [true])
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

//probamos meter datos nuevos a my_table
app.put('/newData',(req,res)=>{
    //Asi se hacen los querys que no regresan nada
    db.none("INSERT INTO my_table (name, email) VALUES ('Joel', 'correo4@google.com');");
    res.send("success");
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});