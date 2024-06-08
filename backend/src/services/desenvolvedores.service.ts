import moment from "moment";

import prismaClient from "../prisma";
import { IDesenvolvedor } from "../types/types";

export const getDesenvolvedoresService = async ({
  query,
  skip = 0,
  take = 10,
}: {
  query?: string;
  skip: number;
  take: number;
}) => {
  const where: any = query
    ? { nome: { contains: query, mode: "insensitive" } }
    : {};

  const desenvolvedores = await prismaClient.desenvolvedor.findMany({
    where,
    skip,
    take,
    include: { nivel: true },
  });

  const hoje = moment();

  desenvolvedores.forEach((dev: IDesenvolvedor) => {
    const dataNascimento = moment(dev.data_nascimento);

    dev.idade = hoje.diff(dataNascimento, "years");
  });

  const total = await prismaClient.desenvolvedor.count({ where });

  return { desenvolvedores, total };
};

export const getDesenvolvedorByIdService = async (id: number) => {
  return await prismaClient.desenvolvedor.findFirst({
    where: { id },
  });
};

export const createDesenvolvedorService = async ({
  nivel_id,
  nome,
  sexo,
  data_nascimento,
  hobby,
}: IDesenvolvedor) => {
  return await prismaClient.desenvolvedor.create({
    data: {
      nivel_id,
      nome,
      sexo,
      data_nascimento,
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
