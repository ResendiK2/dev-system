import { Request, Response } from "express";

import {
  createNivelService,
  getNiveisService,
  updateNivelService,
  deleteNivelService,
} from "../services/niveis.service";

import { getDesenvolvedorByNivelService } from "../services/desenvolvedores.service";

export const getNiveis = async (req: Request, res: Response) => {
  try {
    const niveis = await getNiveisService();

    if (!niveis?.length)
      return res.status(404).json({ error: "Nenhum nível encontrado." });

    return res.status(200).json(niveis);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar níveis." });
  }
};

export const createNivel = async (req: Request, res: Response) => {
  try {
    const { nivel }: { nivel: string } = req.body;

    if (!nivel) return res.status(400).json({ error: "Dados inválidos." });

    const newNivel = await createNivelService(nivel);

    return res.status(201).json(newNivel);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar nível." });
  }
};

export const updateNivel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nivel,
    }: {
      nivel: string;
    } = req.body;

    if (!nivel) return res.status(400).json({ error: "Dados inválidos." });

    const updatedNivel = await updateNivelService({ id: Number(id), nivel });

    return res.status(200).json(updatedNivel);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar nível." });
  }
};

export const deleteNivel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const desenvolvedores = await getDesenvolvedorByNivelService(Number(id));

    if (desenvolvedores?.length)
      return res
        .status(400)
        .json({ error: "Este nível possui desenvolvedores associados." });

    await deleteNivelService(Number(id));

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao remover nível." });
  }
};
