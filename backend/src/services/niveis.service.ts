import prismaClient from "../prisma";

import { INivel } from "../types/types";

export const getNiveisService = async () => {
  return await prismaClient.nivel.findMany();
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
