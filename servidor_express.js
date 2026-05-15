// servidor_express.js

// Express facilita muchísimo la creación de servidores web.
// En comparación con http nativo, el código queda más corto,
// más limpio y más fácil de mantener.
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const puerto = 2006;

// Express no tiene __dirname por defecto en módulos ES,
// así que se obtiene manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Me parece que express hace el código mucho más entendible,
// especialmente al manejar rutas y archivos HTML.
// También evita repetir mucho código.

// Middleware para archivos estáticos
// Esto permite usar imágenes, CSS o JS desde la carpeta "public"
app.use(express.static('public'));


// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'bienvenida.html'));
});


// API de usuarios
app.get('/api/usuarios', (req, res) => {

  const usuarios = [
    {
      nombre: 'Punk',
      saldo: '0'
    },
    {
      nombre: 'Gloria',
      saldo: '1500'
    }
  ];

  // Express simplifica enviar JSON con res.json()
  res.json(usuarios);
});


// API de movimientos
app.get('/api/movimientos', (req, res) => {

  const movimientos = [
    { tipo: 'depósito', cantidad: 500, fecha: '2024-01-10' },
    { tipo: 'retiro', cantidad: 200, fecha: '2024-01-15' }
  ];

  res.json(movimientos);
});


// Página perfil
app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'perfil.html'));
});


// Página movimientos
app.get('/movimientos', (req, res) => {
  res.sendFile(path.join(__dirname, 'movimientos.html'));
});


// Página equipo
app.get('/equipo', (req, res) => {
  res.sendFile(path.join(__dirname, 'equipo.html'));
});


// Página opinión
app.get('/opinion', (req, res) => {
  res.sendFile(path.join(__dirname, 'opinion.html'));
});


// Ruta 404
// Express permite manejar errores de forma más elegante
app.use((req, res) => {
  res.status(404).send(
    '¡Ups! Esta página se fue de vacaciones y no dejó dirección. 🌴'
  );
});


// Iniciar servidor
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});