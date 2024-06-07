import prismaClient from "../prisma";

import { INivel } from "../types/types";

export const getNiveisService = async (
  nome?: string,
  skip: number = 0,
  take: number = 5
) => {
  const where: any = nome
    ? { nome: { contains: nome, mode: "insensitive" } }
    : {};

  const niveis = await prismaClient.nivel.findMany({
    where,
    skip,
    take,
    include: { Desenvolvedor: true },
  });

  niveis.forEach((nivel: INivel) => {
    nivel.n_desenvolvedores = nivel.Desenvolvedor?.length || 0;

    delete nivel.Desenvolvedor;
  });

  const total = await prismaClient.nivel.count({ where });

  return { niveis, total };
};

export const createNivelService = async (nivel: string) => {
  return await prismaClient.nivel.create({
    data: { nivel },
  });
};

export const updateNivelService = async ({ id, nivel }: INivel) => {
  return await prismaClient.nivel.update({
    where: { id },
    data: { nivel },
  });
};

export const deleteNivelService = async (id: number) => {
  return await prismaClient.nivel.delete({
    where: { id },
  });
};
