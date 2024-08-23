const express = require('express');
const routes = express.Router();

const empresa = require('./src/controller/empresaController')

routes
    .post('/add-user', empresa.registrarEmpresa)
    .get('/empresa/:id', empresa.getEmpresaById)
    .delete('/Remove-empresa/:id', empresa.deleteEmpresaById)
    .put('/Update-empresa/:id', empresa.updateEmpresaById)



    

module.exports = routes;