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
    const { page = 1, per_page = 5, nome } = req.query;

    const paginaAtual = parseInt(page as string) || 1;
    const porPagina = parseInt(per_page as string) || 5;

    const skip = (paginaAtual - 1) * porPagina;
    const take = porPagina;

    const { niveis, total } = await getNiveisService(
      nome as string,
      skip,
      take
    );

    if (!niveis.length)
      return res.status(404).json({ error: "Nenhum nível encontrado." });

    res.status(200).json({
      data: niveis,
      meta: {
        total,
        per_page: porPagina,
        current_page: paginaAtual,
        last_page: Math.ceil(total / porPagina),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar níveis." });
  }
};

export const createNivel = async (req: Request, res: Response) => {
  try {
    const { nivel }: { nivel: string } = req.body;

    if (!nivel) return res.status(400).json({ error: "Dados inválidos." });

    const newNivel = await createNivelService(nivel);

    res.status(201).json(newNivel);
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

    res.status(200).json(updatedNivel);
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

    res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: "Erro ao remover nível." });
  }
};
