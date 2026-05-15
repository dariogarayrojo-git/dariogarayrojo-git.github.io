import express from 'express';
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// ─────────────────────────────────────────────
// Datos simulados (en lugar de una base de datos real)
// ─────────────────────────────────────────────

const merchants = [
  {
    merchant_id: 1,
    nombre: 'Amazon MX',
    url_dominio: 'amazon.com.mx',
    activo: true,
  },
  {
    merchant_id: 2,
    nombre: 'Mercado Libre',
    url_dominio: 'mercadolibre.com.mx',
    activo: true,
  },
];

const selectores = [
  { selector_id: 1, merchant_id: 1, tipo: 'precio_principal',
    selector_css: '#priceblock_ourprice', activo: true },
  { selector_id: 2, merchant_id: 2, tipo: 'precio_principal',
    selector_css: '.price-tag-amount', activo: true },
];

const eventos = [];

// ─────────────────────────────────────────────
// RUTA GET — Obtener un merchant por su ID
// Ejemplo similar a: /getBancos/:id
// ─────────────────────────────────────────────

app.get('/getMerchant/:id', (req, res) => {
  // Extraemos el parámetro 'id' de la URL y lo convertimos a número
  const merchantId = parseInt(req.params.id);

  // Buscamos en el arreglo el merchant cuyo merchant_id coincida
  const merchant = merchants.find(m => m.merchant_id === merchantId);

  // Si no existe, respondemos con 404 Not Found
  if (!merchant) {
    return res.status(404).json({
      error: `No se encontró ningún merchant con id ${merchantId}`
    });
  }

  // Si existe, respondemos con 200 OK y los datos del merchant
  return res.status(200).json(merchant);
});

// ─────────────────────────────────────────────
// RUTA POST — Registrar un evento para un usuario
// Ejemplo similar a: /postBancos/:nombre
// ─────────────────────────────────────────────

app.post('/postEvento/:userId', (req, res) => {
  // Extraemos el parámetro 'userId' de la URL
  const userId = parseInt(req.params.userId);

  // Extraemos el tipo de evento y el payload del body
  const { tipoEvento, merchantId, payload } = req.body;

  // Validamos que venga al menos el tipo de evento
  if (!tipoEvento) {
    return res.status(400).json({ error: 'El campo tipoEvento es obligatorio.' });
  }

  // Creamos el nuevo evento con un id autogenerado y la fecha actual
  const nuevoEvento = {
    event_id: eventos.length + 1,
    user_id: userId,
    merchant_id: merchantId || null,
    tipo_evento: tipoEvento,
    payload: payload || {},
    creado_en: new Date().toISOString(),
  };

  // Guardamos el evento en el arreglo simulado
  eventos.push(nuevoEvento);

  // Respondemos con 201 Created y el evento registrado
  return res.status(201).json(nuevoEvento);
});

// ─────────────────────────────────────────────
// RUTA DELETE — Desactivar un selector de un merchant
// Usa dos parámetros: merchantId y selectorId
// ─────────────────────────────────────────────

app.delete('/deleteSelectorMerchant/:merchantId/:selectorId', (req, res) => {
  // Extraemos ambos parámetros de la URL
  const merchantId  = parseInt(req.params.merchantId);
  const selectorId  = parseInt(req.params.selectorId);

  // Buscamos el selector que coincida con ambos parámetros
  const selector = selectores.find(
    s => s.merchant_id === merchantId && s.selector_id === selectorId
  );

  // Si no existe o no pertenece al merchant indicado, respondemos 404
  if (!selector) {
    return res.status(404).json({
      error: `No se encontró el selector ${selectorId} para el merchant ${merchantId}`
    });
  }

  // Eliminación lógica: marcamos como inactivo para conservar trazabilidad
  selector.activo = false;

  // Respondemos con 200 OK confirmando la desactivación
  return res.status(200).json({
    mensaje: `Selector ${selectorId} desactivado correctamente.`,
    selector,
  });
});

// ─────────────────────────────────────────────
// Iniciamos el servidor en el puerto 3000
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor Kueski Pay corriendo en http://localhost:${PORT}`);
});