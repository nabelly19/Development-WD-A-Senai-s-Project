//prisma connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { hashPassword } = require('../config/auth');

class EmpresaService {
  async createEmpresa(data) {
    
    const matrizExists = await prisma.matriz.findFirst();
    const hashedPassword = await hashPassword(data.matriz.Senha)

    const uniqueCode = `EMP-${Date.now()}`;

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
            Codigo: uniqueCode,
            Enderecos: {
                create: data.Enderecos,
            },
            Contatos: {
                create: data.Contatos,
            },
            Matriz: data.matriz ? {
              create: {
                E_matriz: true,
                Senha: hashedPassword,
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
