//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const session = require('express-session')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class EmpresaService {
  async createEmpresa(data) {
    
    const matrizExists = await prisma.matriz.findFirst();

    if (!matrizExists){
      data.matriz = {
        E_matriz: true,
        Senha: data.Senha,
      }
      data.Possui_Filial = false;
    }

    else {
      if(data.matriz) {
        throw new Error('Já existe uma matriz registrada.')
      }
    }

    const createEmpresa = await prisma.empresa.create({
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
            Matriz: data.matriz ? {
              create: {
                E_matriz: true,
                Senha: data.matriz.Senha,
              },
            } : undefined,
            Filiais: data.filiais ? {
              create: data.filiais
            } : undefined,
        },
    });
    return createEmpresa
  }

  async getEmpresaById(id) {
    return prisma.empresa.findUnique({
      where: {id: parseInt(id)},
      incluse: {
        Enderecos: true,
        Contatos: true,
        Matriz: true,
        Filiais: true,
      },
    });
  }

  async updateEmpresa(id, data) {
    const currentEmpresa = await prisma.empresa.findUnique({
      where: {id: parseInt(id)},
      include: { Matriz: true },
    });

    if (currentEmpresa.matriz) {
      if (data.matriz && data.matriz.E_matriz === false) {
        throw new Error ("Não é permitido desmarcar uma matriz");
      }
    }
    else {
      if (data.matriz && data.matriz.E_matriz === true) {
        throw new Error("Não é permitido converter uma filiar em matriz");
      }
    }

    return prisma.empresa.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteEmpresa(id) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: parseInt(id) },
      include: {Matriz: true},
    });

    if (empresa.matriz) {
      throw new Error("A matriz não pode ser deletada");
    }

    return prisma.empresa.delete({
      where: { id: parseInt(id)},
    });
  }
}

module.exports = EmpresaService;
