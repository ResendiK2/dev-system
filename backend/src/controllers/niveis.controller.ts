import { Request, Response } from "express";

import {
  createNivelService,
  getNiveisService,
  updateNivelService,
  deleteNivelService,
  getNivelByNameService,
  getNivelByIdService,
} from "../services/niveis.service";

import { getDesenvolvedorByNivelService } from "../services/desenvolvedores.service";

export const getNiveis = async (req: Request, res: Response) => {
  try {
    const { page = 1, query } = req.query || {};

    const paginaAtual = parseInt(page as string) || 1;
    const porPagina = 10;

    const skip = (paginaAtual - 1) * porPagina;
    const take = porPagina;

    const { niveis, total } = await getNiveisService(
      query as string,
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

    if (!nivel)
      return res.status(400).json({ error: "O campo 'nivel' é obrigatório." });

    const alreadyExists = await getNivelByNameService(nivel);

    if (alreadyExists)
      return res
        .status(409)
        .json({ error: "Um nível com este nome já existe." });

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

    if (!nivel || !id)
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });

    const alreadyExists = await getNivelByIdService(Number(id));

    if (!alreadyExists)
      return res.status(404).json({ error: "Nível não encontrado." });

    const updatedNivel = await updateNivelService({ id: Number(id), nivel });

    res.status(200).json(updatedNivel);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar nível." });
  }
};

export const deleteNivel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ error: "Id do nível é obrigatório." });

    const alreadyExists = await getNivelByIdService(Number(id));

    if (!alreadyExists)
      return res.status(404).json({ error: "Nível não encontrado." });

    const desenvolvedores = await getDesenvolvedorByNivelService(Number(id));

    if (desenvolvedores?.length)
      return res
        .status(409)
        .json({ error: "Este nível possui desenvolvedores associados." });

    const deletedNivel = await deleteNivelService(Number(id));

    res.status(204).send(deletedNivel);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao remover nível." });
  }
};
