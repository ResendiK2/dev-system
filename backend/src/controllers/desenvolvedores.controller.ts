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

const validateFields = ({
  id,
  checkId,
  nivel_id,
  nome,
  sexo,
  data_nascimento,
  hobby,
}: {
  id: string;
  checkId: boolean;
  nivel_id: string;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
}) => {
  if (checkId && (Number.isNaN(Number(id)) || Number(id) < 1))
    return { error: "Id inválido." };

  if (!nome?.length || nome.length < 3 || nome.length > 100)
    return { error: "Nome inválido." };

  if (!["M", "F"].includes(sexo)) return { error: "Sexo inválido." };

  if (Number.isNaN(Number(nivel_id)) || Number(nivel_id) < 1)
    return { error: "Nível inválido." };

  if (!data_nascimento || !moment(data_nascimento).isValid())
    return { error: "Data de nascimento inválida." };

  if (!hobby?.length || hobby.length < 3 || hobby.length > 300)
    return { error: "Hobby inválido." };
};

export const getDesenvolvedores = async (req: Request, res: Response) => {
  try {
    const { page = 1, query = "" } = req.query || {};

    const paginaAtual = parseInt(page as string) || 1;
    const porPagina = 10;

    const skip = (paginaAtual - 1) * porPagina;
    const take = porPagina;

    const { desenvolvedores, total } = await getDesenvolvedoresService({
      query: query as string,
      skip,
      take,
    });

    if (!desenvolvedores.length) {
      const hasNoQuery = !query || query.length === 0;

      return res
        .status(hasNoQuery ? 204 : 404)
        .json(hasNoQuery ? [] : { error: "Nenhum desenvolvedor encontrado." });
    }

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

    if (validateFields(req.body))
      return res.status(400).json(validateFields(req.body));

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

    if (validateFields({ ...req.body, id, checkId: true }))
      return res
        .status(400)
        .json(validateFields({ ...req.body, id, checkId: true }));

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
    res.status(500).json({ error: "Erro ao atualizar desenvolvedor." });
  }
};

export const deleteDesenvolvedor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id)))
      return res.status(400).json({ error: "Id inválido." });

    const devExists = await getDesenvolvedorByIdService(Number(id));

    if (!devExists)
      return res.status(404).json({ error: "Desenvolvedor não encontrado." });

    const deletedDev = await deleteDesenvolvedorService(Number(id));

    res.status(204).send(deletedDev);
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover desenvolvedor." });
  }
};
