// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
// ATENÇÃO: Caminho correto para o seu db.json
const router = jsonServer.router('src/public/db/db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors'); // Importa o pacote cors

// Configure CORS para permitir requisições de qualquer origem
server.use(cors());

server.use(middlewares);
server.use(router);

// O Render injeta a porta via process.env.PORT
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});