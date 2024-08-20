//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const session = require('express-session')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class EmpresaService {
  async createEmpresa(data) {
    const empresas = await prisma.empresa.findMany();
    const isFirtEmpresa = empresas.length === 0;

    const create = await prisma.empresa.create({
        data: {
            Nome: data.Nome,
            CNPJ: data.CNPJ,
            Possui_Filial: data.Possui_Filial,
            Data_Abertura: data.Data_Abertura,
            Codigo: data.Codigo,
            Enderecos: {
                create: data.Enderecos,
            },
            Contatos: {
                create: data.Contatos,
            },
            Dados_Treino: {
                create: data.Dados_Treino,
            },


        }
    })

  }

  async getEmpresaById(id) {
    return prisma.empresa.findUnique({
      where: { id: parseInt(id) },
      include: {
        enderecos: true,
        contatos: true,
        matriz: true,
        filiais: true,
      },
    });
  }

  async updateEmpresa(id, data) {
    return prisma.empresa.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteEmpresa(id) {
    return prisma.empresa.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = EmpresaService;
