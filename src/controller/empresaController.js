const express = require('express');
const { generateToken, authenticateToken, comparePassword, hashPassword } = require('../config/auth');
const EmpresaService = require('../services/empresaService');

const empresaService = new EmpresaService();

module.exports = {

  async registrarEmpresa(req, res) {
  const data = req.body;
  try {
    const novaEmpresa = await empresaService.createEmpresa(data);
    res.status(201).json(novaEmpresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  },

  async getEmpresaById (req, res) {
  const id = req.params.id;
  try {
    const empresa = await empresaService.getEmpresaById(id);
    if (!empresa) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empresa' });
  }
  },

  async updateEmpresaById (req, res)  {
  const id = req.params.id;
  const data = req.body;
  try {
    const empresaAtualizada = await empresaService.updateEmpresa(id, data);
    res.status(200).json(empresaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  },

  async deleteEmpresaById(req, res) {
  const id = req.params.id;
  try {
    await empresaService.deleteEmpresa(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},

}


