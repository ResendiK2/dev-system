import prismaClient from "../prisma";

import { INivel } from "../types/types";

export const getNiveisService = async ({
  query,
  skip = 0,
  take = 10,
}: {
  query?: string;
  skip: number;
  take: number;
}) => {
  const where: any = query
    ? { nivel: { contains: query, mode: "insensitive" } }
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

  const total = (await prismaClient.nivel.count({ where })) || 0;

  return { niveis, total };
};

export const getNivelByNameService = async (nivel: string) => {
  return await prismaClient.nivel.findFirst({
    where: {
      nivel: {
        equals: nivel,
        mode: "insensitive",
      },
    },
  });
};

export const getNivelByIdService = async (id: number) => {
  return await prismaClient.nivel.findFirst({
    where: { id },
  });
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
