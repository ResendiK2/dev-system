import { Request, Response } from "express";
import {
  getDesenvolvedoresService,
  createDesenvolvedorService,
  updateDesenvolvedorService,
  deleteDesenvolvedorService,
} from "../services/desenvolvedores.service";
import { IDesenvolvedor } from "../types/types";

export const getDesenvolvedores = async (req: Request, res: Response) => {
  try {
    const desenvolvedores = await getDesenvolvedoresService();

    if (!desenvolvedores?.length)
      return res
        .status(404)
        .json({ error: "Nenhum desenvolvedor encontrado." });

    res.status(200).json(desenvolvedores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar desenvolvedores." });
  }
};

export const createDesenvolvedor = async (req: Request, res: Response) => {
  try {
    const {
      nivel_id,
      nome,
      sexo,
      data_nascimento,
      idade,
      hobby,
    }: IDesenvolvedor = req.body;

    if (!nivel_id || !nome || !sexo || !data_nascimento || !idade || !hobby)
      return res.status(400).json({ error: "Dados inválidos." });

    const newDesenvolvedor = await createDesenvolvedorService({
      nivel_id,
      nome,
      sexo,
      data_nascimento,
      idade,
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

    const {
      nome,
      hobby,
      nivel_id,
      sexo,
      data_nascimento,
      idade,
    }: IDesenvolvedor = req.body;

    const updatedDesenvolvedor = await updateDesenvolvedorService({
      id: Number(id),
      nome,
      hobby,
      nivel_id,
      sexo,
      data_nascimento: new Date(data_nascimento),
      idade,
    });
    res.status(200).json(updatedDesenvolvedor);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar desenvolvedor." });
  }
};

export const deleteDesenvolvedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteDesenvolvedorService(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao remover desenvolvedor." });
  }
};