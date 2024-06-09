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
    const { page = 1, query = "" } = req.query || {};

    const paginaAtual = parseInt(page as string) || 1;
    const porPagina = 10;

    const skip = (paginaAtual - 1) * porPagina;
    const take = porPagina;

    const { niveis, total } = await getNiveisService({
      query: query as string,
      skip,
      take,
    });

    if (!niveis.length) {
      const hasQuery = query && query.length > 0;
      return res
        .status(hasQuery ? 404 : 204)
        .json(hasQuery ? { error: "Nenhum nível encontrado." } : []);
    }

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

    if (!nivel || nivel.length < 3 || nivel.length > 100)
      return res.status(400).json({ error: "Nivel inválido." });

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
    const { nivel } = req.body;

    if (!id || Number.isNaN(Number(id)))
      return res.status(400).json({ error: "Id inválido." });

    if (!nivel || nivel.length < 3 || nivel.length > 100)
      return res.status(400).json({ error: "Nível inválido." });

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

    if (!id || Number.isNaN(Number(id)))
      return res.status(400).json({ error: "Id inválido." });

    const alreadyExists = await getNivelByIdService(Number(id));

    if (!alreadyExists)
      return res.status(404).json({ error: "Nível não encontrado." });

    const desenvolvedores = await getDesenvolvedorByNivelService(Number(id));

    if (desenvolvedores?.length)
      return res
        .status(409)
        .json({ error: "Existem desenvolvedores com este nível." });

    const deletedNivel = await deleteNivelService(Number(id));

    res.status(204).send(deletedNivel);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover nível." });
  }
};
