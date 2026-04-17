import http from 'http';

const puerto = 3000;
const API_KEY = "live_Pf0CEhoAKHScvED55lkl44G5m36yLcyLZhgXtAPPv41ns7RflDBQza8fdkoPy4n5"; // pon tu API key de TheCatAPI

// Crear servidor
const servidor = http.createServer(async (req, res) => {

  console.log("Solicitud:", req.method);

  // GET -> Mostrar imagen
  if (req.method === "GET") {

    try {
      const url = "https://api.thecatapi.com/v1/images/search";

      // Petición a la API
      const respuesta = await fetch(url, {
        headers: {
          "x-api-key": API_KEY
        }
      });

      const data = await respuesta.json();

      const imagen = data[0].url;
      const image_id = data[0].id;

      // Enviamos HTML al navegador
      res.writeHead(200, { "Content-Type": "text/html" });

      res.end(`
        <h1>Imagen de gato</h1>
        <img src="${imagen}" width="400">
        
        <br><br>

        <!-- Formulario para hacer POST -->
        <form method="POST">
          <input type="hidden" name="image_id" value="${image_id}">
          <button type="submit">Dar like</button>
        </form>
      `);

    } catch (error) {
      res.writeHead(500);
      res.end("Error en GET");
    }
  }

  // POST -> Enviar voto
  else if (req.method === "POST") {

    let body = "";

    // Recibir datos del formulario
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {

      try {
        // Convertir form-data a objeto
        const params = new URLSearchParams(body);
        const image_id = params.get("image_id");

        const url = "https://api.thecatapi.com/v1/votes";

        // Petición POST a la API
        const respuesta = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
          },
          body: JSON.stringify({
            image_id: image_id,
            value: 1
          })
        });

        await respuesta.json();

        // Respuesta visual en navegador
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <h1>Voto enviado</h1>
          <p>Le diste like a la imagen</p>
          <a href="/">Ver otra imagen</a>
        `);

      } catch (error) {
        console.error(error);
        res.writeHead(500);
        res.end("Error en POST");
      }

    });
  }

});

// Levantar servidor
servidor.listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}`);
});