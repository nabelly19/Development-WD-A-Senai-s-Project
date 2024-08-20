const express = require('express');
const bcrypt = require('bcryptjs')
const EmpresaService = require('./services/EmpresaService');

const app = express();
app.use(express.json());

const empresaService = new EmpresaService();

// Rota para criar uma nova empresa
app.post('/empresa', async (req, res) => {
  const data = req.body;
  try {
    const novaEmpresa = await empresaService.createEmpresa(data);
    res.status(201).json(novaEmpresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para listar todas as empresas
app.get('/empresas', async (req, res) => {
  try {
    const empresas = await empresaService.getEmpresas();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para obter uma empresa por ID
app.get('/empresa/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const empresa = await empresaService.getEmpresaById(id);
    if (empresa) {
      res.status(200).json(empresa);
    } else {
      res.status(404).json({ error: 'Empresa não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para atualizar uma empresa
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

// Rota para deletar uma empresa
app.delete('/empresa/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await empresaService.deleteEmpresa(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
