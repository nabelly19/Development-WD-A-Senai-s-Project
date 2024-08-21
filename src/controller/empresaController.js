const express = require('express');
const bcrypt = require('bcryptjs')
const EmpresaService = require('../services/empresaService');

const app = express();
app.use(express.json());

const empresaService = new EmpresaService();

// Rota para criar uma nova empresa
app.post('/registrar', async (req, res) => {
  const data = req.body;
  try {
    const novaEmpresa = await empresaService.createEmpresa(data);
    res.status(201).json(novaEmpresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para obter uma empresa por ID
app.get('/empresa/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const empresa = await empresaService.getEmpresaById(id);
    if (!empresa) {
      return res.status(404).json({error : 'Empresa não encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresa' });
  }
});

// Rota para atualizar uma empresa por ID
app.put('/empresa/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const empresaAtualizada = await empresaService.updateEmpresa(id, data);
    res.status(200).json(empresaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para deletar uma empresa por ID
app.delete('/empresa/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await empresaService.deleteEmpresa(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


