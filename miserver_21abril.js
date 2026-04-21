import http from 'http';
import url from 'url';

const servidor = http.createServer((req, res) => {
  // console.log(req);
  //console.log(req);
  const urlProcesada = url.parse(req.url, true);
  //console.log(urlProcesada);
  const queryParams = urlProcesada.query;
  console.log(queryParams.x);
  console.log(queryParams.y);

  const nombre = queryParams.nombre;
  

  console.log("Alguien me mandó una solicitud");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (nombre) {
    res.end(`Hola, ${nombre}! Bienvenido al servidor.\n`);
  } else {
    res.end(`Hola, desconocido. No me dijiste tu nombre.\n`);
  }
});

const puerto = 1984;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
