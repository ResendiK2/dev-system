import { Request, Response } from "express";
import moment from "moment";

import {
  getDesenvolvedoresService,
  createDesenvolvedorService,
  updateDesenvolvedorService,
  deleteDesenvolvedorService,
  getDesenvolvedorByIdService,
} from "../services/desenvolvedores.service";

import { IDesenvolvedor } from "../types/types";

export const getDesenvolvedores = async (req: Request, res: Response) => {
  try {
    const { page = 1, query } = req.query || {};

    const paginaAtual = parseInt(page as string) || 1;
    const porPagina = 10;

    const skip = (paginaAtual - 1) * porPagina;
    const take = porPagina;

    const { desenvolvedores, total } = await getDesenvolvedoresService(
      query as string,
      skip,
      take
    );

    if (!desenvolvedores.length)
      return res
        .status(404)
        .json({ error: "Nenhum desenvolvedor encontrado." });

    res.status(200).json({
      data: desenvolvedores,
      meta: {
        total,
        per_page: porPagina,
        current_page: paginaAtual,
        last_page: Math.ceil(total / porPagina),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar desenvolvedores." });
  }
};

export const createDesenvolvedor = async (req: Request, res: Response) => {
  try {
    const { nivel_id, nome, sexo, data_nascimento, hobby }: IDesenvolvedor =
      req.body;

    if (!nivel_id || !nome || !sexo || !data_nascimento || !hobby)
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });

    const newDesenvolvedor = await createDesenvolvedorService({
      nivel_id,
      nome,
      sexo,
      data_nascimento: moment(data_nascimento).toDate(),
      hobby,
    });

    res.status(201).json(newDesenvolvedor);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar desenvolvedor." });
  }
};

export const updateDesenvolvedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { nome, hobby, nivel_id, sexo, data_nascimento }: IDesenvolvedor =
      req.body;

    if (!id || !nome || !hobby || !nivel_id || !sexo || !data_nascimento)
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });

    const devExists = await getDesenvolvedorByIdService(Number(id));

    if (!devExists)
      return res.status(404).json({ error: "Desenvolvedor não encontrado." });

    const updatedDesenvolvedor = await updateDesenvolvedorService({
      id: Number(id),
      nome,
      hobby,
      nivel_id,
      sexo,
      data_nascimento: new Date(data_nascimento),
    });

    res.status(200).json(updatedDesenvolvedor);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar desenvolvedor." });
  }
};

export const deleteDesenvolvedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ error: "Id do desenvolvedor é obrigatório." });

    const devExists = await getDesenvolvedorByIdService(Number(id));

    if (!devExists)
      return res.status(404).json({ error: "Desenvolvedor não encontrado." });

    const deletedDev = await deleteDesenvolvedorService(Number(id));

    res.status(204).send(deletedDev);
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover desenvolvedor." });
  }
};
