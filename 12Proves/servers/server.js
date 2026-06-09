import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración necesaria para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Función auxiliar para leer archivos JSON de forma síncrona
const readJson = (fileName) => {
  const filePath = path.join(__dirname, 'api-data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Carga tus archivos
const db = {
  usuarios: readJson('usuarios.json'),
 // productos: readJson('productos.json'),
 // pedidos: readJson('pedidos.json')
};

const router = jsonServer.router(db);

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server está corriendo en el puerto ${PORT}`);
});