const express = require('express');
const Usuario = require('./controllers/usuario.controllers');
const Produto = require('./controllers/produtos.controllers');

const routes = express.Router();

routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details/:id',Usuario.details);
routes.post('/api/usuarios',Usuario.create);
routes.put('/api/usuarios/:id',Usuario.update);
routes.delete('/api/usuarios/:id',Usuario.delete);

//Rotas de Produtos
routes.get('/api/produtos',Produto.index);
routes.get('/api/produtos.details/:id',Produto.details);
routes.post('/api/produtos',Produto.create);
routes.put('/api/produtos',Produto.update);
routes.delete('/api/produtos/:id',Produto.delete);

module.exports = routes;