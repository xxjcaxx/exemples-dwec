const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');  // Importa el paquete CORS

// Crea el servidor WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado.');

  // Enviar un mensaje al cliente
  ws.send(JSON.stringify({ message: 'Conexión exitosa', status: 200 }));

  let time = 10000;
  const sendMessage = () => {
    ws.send(
      JSON.stringify({
        message: ['🍔', '🍕', '🌮', '🍣', '🍦'].at(Math.floor(Math.random() * 5)),
        status: 200,
      })
    );
    time = Math.max(500, time * 0.9);
    setTimeout(sendMessage, time);
  };

  // Iniciar el primer envío
  sendMessage();

  // Manejar mensajes entrantes del cliente
  ws.on('message', (data) => {
    console.log('received: %s', data);

    // Responder al cliente
   ws.send(JSON.stringify({ message: JSON.parse(data).message, status:200}));
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

console.log('Servidor WebSocket escuchando en ws://localhost:8080');


////////////// SSE


const app = express();
app.use(cors({
  origin: 'http://localhost:4200', // Cambia a la URL de tu frontend Angular
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
const sseClients = [];

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  sseClients.push(res);
  console.log('Cliente SSE conectado');

  req.on('close', () => {
    console.log('Cliente SSE desconectado');
    const index = sseClients.indexOf(res);
    if (index !== -1) sseClients.splice(index, 1);
  });
});

// Enviar un evento SSE cada 5 segundos
setInterval(() => {
  const message = `Mensaje SSE: ${new Date().toISOString()}`;
  console.log('Enviando:', message);

  sseClients.forEach((client) => client.write(`data: ${message}\n\n`));
}, 1000);

app.listen(8081, () => console.log('SSE corriendo en http://localhost:8081'));



