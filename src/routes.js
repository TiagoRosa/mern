const express = require('express');
const Usuario = require('./controllers/usuario.controllers');
const Produto = require('./controllers/produtos.controllers');

const routes = express.Router();

routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details/:id',Usuario.details);
routes.post('/api/usuarios',Usuario.create);
routes.put('/api/usuarios/:id',Usuario.update);
routes.delete('/api/usuarios/:id',Usuario.delete);
routes.post('/api/usuarios/login',Usuario.login);
routes.get('/api/usuarios/checktoken',Usuario.checkToken);
routes.get('/api/usuarios/destroytoken',Usuario.destroyToken);

//Rotas de Produtos
routes.get('/api/produtos',Produto.index);
routes.get('/api/produtos.details/:id',Produto.details);
routes.post('/api/produtos',Produto.create);
routes.put('/api/produtos',Produto.update);
routes.delete('/api/produtos/:id',Produto.delete);

module.exports = routes;