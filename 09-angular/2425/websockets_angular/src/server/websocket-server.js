const WebSocket = require('ws');

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



