import prismaClient from "../prisma";
import { IDesenvolvedor } from "../types/types";

export const getDesenvolvedoresService = async () => {
  return await prismaClient.desenvolvedor.findMany({
    include: { nivel: true },
  });
};

export const createDesenvolvedorService = async ({
  nivel_id,
  nome,
  sexo,
  data_nascimento,
  idade,
  hobby,
}: IDesenvolvedor) => {
  return await prismaClient.desenvolvedor.create({
    data: {
      nivel_id,
      nome,
      sexo,
      data_nascimento,
      idade,
      hobby,
    },
  });
};

export const updateDesenvolvedorService = async ({
  id,
  nome,
  hobby,
  nivel_id,
  sexo,
  data_nascimento,
}: IDesenvolvedor) => {
  return await prismaClient.desenvolvedor.update({
    where: { id },
    data: { nome, hobby, nivel_id, sexo, data_nascimento },
  });
};

export const deleteDesenvolvedorService = async (id: number) => {
  return await prismaClient.desenvolvedor.delete({
    where: { id },
  });
};

export const getDesenvolvedorByNivelService = async (id: number) => {
  return await prismaClient.desenvolvedor.findMany({
    where: { nivel_id: id },
    include: { nivel: true },
  });
};
