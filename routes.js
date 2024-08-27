const express = require('express');
const routes = express.Router();

const empresa = require('./src/controller/empresaController');
const { authenticateToken } = require('./src/config/auth');  // Importe o middleware de autenticação

routes
    .post('/api/add-user', empresa.registrarEmpresa)  // Registro não precisa de autenticação
    .get('/api/empresa/:id', authenticateToken, empresa.getEmpresaById)  // Protegido com JWT
    .delete('/api/Remove-empresa/:id', authenticateToken, empresa.deleteEmpresaById)  // Protegido com JWT
    .put('/api/Update-empresa/:id', authenticateToken, empresa.updateEmpresaById);  // Protegido com JWT

module.exports = routes;
