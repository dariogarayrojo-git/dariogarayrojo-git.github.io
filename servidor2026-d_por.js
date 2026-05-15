import express from 'express';
import mysql from 'mysql2';
//Pendiente nombre de la librería
import NodeCache from 'node-cache';

import path from 'path';
import { fileURLToPath } from 'url';


//stdTTL
const myCache = new NodeCache({ stdTTL:  2026 });

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();


//Completa los datos correctos
  const connection = mysql.createConnection({
  host: "mysql-31efc894-tec-f26e.e.aivencloud.com",
  port: 20902,
  user: "avnadmin",
  password: "TU_PASSWORD",
  database: "defaultdb"
});


let datosDB;

connection.connect(error => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("Conectada a MySQL");
});

async function getDonantes() {

  const cacheKey = "misDonantes";

  const consultaSQL = `SELECT * FROM donantes;`;

  const cachedDonantes = myCache.get(cacheKey);

  if (cachedDonantes) {
    console.log("Servido desde caché");
    return cachedDonantes;
  }

  console.log("Consultando base de datos");

  // NUEVA PROMESA
  return new Promise((resolve, reject) => {

    connection.query(consultaSQL, (error, resultados) => {

      if (error) {
        reject(error);
        return;
      }

      console.log(resultados);

      myCache.set(cacheKey, resultados);

      resolve(resultados);

    });

  });

}

app.get('/storage', (req, res) => {

  //Falta un dato
  res.sendFile(path.join(__dirname, 'localStorage_por.html'));
});

// ROUTE ASÍNCRONA
app.get('/obtenerDatos', async (req, res) => {

  try {

    const datos = await getDonantes();

    res.json(datos);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Error al obtener datos"
    });

  }

});

app.listen(1984, () => {
  console.log('Up and up');
});
