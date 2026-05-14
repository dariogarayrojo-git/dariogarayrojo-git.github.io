import express from 'express';
//import path from 'path';
//import { fileURLToPath } from 'url';
import mysql from 'mysql2';


const app = express();
/*
const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'imagenes')));
app.use(express.json());
*/

const connection = mysql.createConnection({
    host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
    port: 20902,
    user: "avnadmin",
    password: "TU_PASSWORD",
    database: "defaultdb"
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectada");
});

const crearTablaSQL = `
  CREATE TABLE IF NOT EXISTS donantes (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nombre VARCHAR(255) NOT NULL
  );
`;

const insertarDonanteSQL = `
  INSERT INTO donantes (nombre) VALUES ('Donante Anónimo');
`;

const consultaSQL = `
  SELECT * FROM donantes;
`;

connection.query(consultaSQL, (error, resultados) => {
    if (error) throw error;
    //res.json(resultados);
    console.log(resultados);
   connection.end();
  });

/*app.post("/api/otro", (req, res) => {
    console.log("El cuerpo de la petición:", req.body);
    res.sendStatus(200);
});*/

app.get('/bienvenida', (req, res) => {
   res.send('Esto no es una página html');
});


app.get('/otraBienvenida', (req, res) => {
  res.sendFile('bienvenida.html');
});

app.listen(1984, () => {
    console.log('Up and up');
});