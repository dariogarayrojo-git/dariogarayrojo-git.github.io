// http es un módulo nativo de Node.js que permite crear servidores web
// y manejar solicitudes y respuestas HTTP sin necesidad de librerías externas
import http from 'http';

// fs (File System) es un módulo nativo de Node.js que permite leer,
// escribir, eliminar y manipular archivos del sistema operativo
import fs from 'fs';


// Muestra una página HTML de bienvenida al proyecto
function darBienvenida(req, res) {
  fs.readFile('bienvenida.html', 'utf8', (error, data) => {
    if (error) {
      // 500 = Internal Server Error: algo falló dentro del servidor
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    // 200 = OK: la solicitud fue exitosa y se devuelve el contenido
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}


// Envía un JSON con los datos de los usuarios
function getUsuarios(req, res) {
  // Ahora es un array para poder incluir múltiples usuarios
  const usuarios = [
    {
      "nombre": "Punk",
      "saldo": "0"
    },
    {
      "nombre": "Gloria",
      "saldo": "1500"
    }
  ];

  res.writeHead(200, { 'Content-Type': 'application/json' });

  // JSON.stringify convierte un objeto/array de JavaScript a una cadena de texto
  // en formato JSON. Es necesario porque res.end() solo puede enviar strings o buffers,
  // no objetos directamente
  res.end(JSON.stringify(usuarios));
}


function mostrarPerfil(req, res) {
  fs.readFile('perfil.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}


function mostrarMovimientos(req, res) {
  fs.readFile('movimientos.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}


// Envía un JSON con los datos de los movimientos financieros
// BUG CORREGIDO: Content-Type era text/plain, debe ser application/json
// BUG CORREGIDO: el nombre de la función tenía typo (getMoviminientos → getMovimientos)
function getMovimientos(req, res) {
  const movimientos = [
    { "tipo": "depósito", "cantidad": 500, "fecha": "2024-01-10" },
    { "tipo": "retiro",   "cantidad": 200, "fecha": "2024-01-15" }
  ];

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(movimientos));
}


function mostrarEquipo(req, res) {
  fs.readFile('equipo.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}


function mostrarOpinion(req, res) {
  fs.readFile('opinion.html', 'utf8', (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Oh no!!!!');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}


function manejarRuta404(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('¡Ups! Esta página se fue de vacaciones y no dejó dirección. 🌴');
}


// createServer crea un servidor HTTP que escucha solicitudes entrantes.
// Documentación: https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
const servidor = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    darBienvenida(req, res);
  } else if (url === '/api/usuarios') {
    getUsuarios(req, res);
  } else if (url === '/api/movimientos') {
    // BUG CORREGIDO: antes llamaba a getMovimientos pero la función se llamaba getMoviminientos
    getMovimientos(req, res);
  } else if (url === '/perfil') {
    mostrarPerfil(req, res);
  } else if (url === '/movimientos') {
    mostrarMovimientos(req, res);
  } else if (url === '/equipo') {
    mostrarEquipo(req, res);
  } else if (url === '/opinion') {
    mostrarOpinion(req, res);
  } else {
    manejarRuta404(req, res);
  }
});

const puerto = 2000;
servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});