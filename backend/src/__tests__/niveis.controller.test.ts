// __tests__/niveis.controller.test.ts

import { Request, Response } from "express";
import {
  getNiveis,
  createNivel,
  updateNivel,
  deleteNivel,
} from "../controllers/niveis.controller";
import {
  getNiveisService,
  createNivelService,
  updateNivelService,
  deleteNivelService,
  getNivelByNameService,
  getNivelByIdService,
} from "../services/niveis.service";
import { getDesenvolvedorByNivelService } from "../services/desenvolvedores.service";

jest.mock("../services/niveis.service");
jest.mock("../services/desenvolvedores.service");

describe("Niveis Controller test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("getNiveis test", () => {
    it("should return error 500 if an error occurs", async () => {
      req = {
        body: {},
        params: {},
      };

      (getNiveisService as jest.Mock).mockRejectedValue(new Error());

      await getNiveis(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar níveis.",
      });
    });

    it("should return error 404 if no levels are found", async () => {
      req = {
        body: {},
        params: {},
      };

      (getNiveisService as jest.Mock).mockResolvedValue({ niveis: [] });

      await getNiveis(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nenhum nível encontrado.",
      });
    });

    it("should return the levels found", async () => {
      (getNiveisService as jest.Mock).mockResolvedValue({
        niveis: [{ id: 1, nome: "Junior" }],
        total: 1,
      });

      await getNiveis(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({
        data: [{ id: 1, nome: "Junior" }],
        meta: {
          total: 1,
          per_page: 10,
          current_page: 1,
          last_page: 1,
        },
      });
    });
  });

  describe("createNivel test", () => {
    it("should return error 400 if nivel is invalid", async () => {
      req.body = { nome: "" };

      await createNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nivel inválido.",
      });
    });

    it("should return error 400 if nivel is smaller than 3 characters", async () => {
      req.body = { nome: "ab" };

      await createNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nivel inválido.",
      });
    });

    it("should return error 400 if nivel is greater than 100 characters", async () => {
      req.body = { nome: "a".repeat(101) };

      await createNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nivel inválido.",
      });
    });

    it("should return error 409 if level already exists", async () => {
      (getNivelByNameService as jest.Mock).mockResolvedValue({ id: 1 });

      req.body = { nivel: "Junior" };

      await createNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: "Um nível com este nome já existe.",
      });
    });

    it("should return error 500 if an error occurs", async () => {
      (getNivelByNameService as jest.Mock).mockRejectedValue(new Error());

      req.body = { nivel: "Junior" };

      await createNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao criar nível.",
      });
    });

    it("should create a new level", async () => {
      (getNivelByNameService as jest.Mock).mockResolvedValue(null);
      (createNivelService as jest.Mock).mockResolvedValue({
        id: 1,
        nivel: "Junior",
      });

      req.body = { nivel: "Junior" };

      await createNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, nivel: "Junior" });
    });
  });

  describe("updateNivel", () => {
    it("should return error 400 if id is not provided", async () => {
      req = {
        body: { nivel: "Junior" },
        params: {},
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 400 if id is not a number", async () => {
      req = {
        params: { id: "id" },
        body: { nivel: "Junior" },
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 400 if nivel is invalid", async () => {
      req = {
        params: { id: "1" },
        body: {},
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if nivel is smaller than 3 characters", async () => {
      req = {
        params: { id: "1" },
        body: { nivel: "ab" },
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if nivel is greater than 100 characters", async () => {
      req = {
        params: { id: "1" },
        body: { nivel: "a".repeat(101) },
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 404 if level is not found", async () => {
      (getNivelByIdService as jest.Mock).mockResolvedValue(null);

      req = {
        params: { id: "1" },
        body: { nivel: "Junior" },
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível não encontrado.",
      });
    });

    it("should return error 500 if an error occurs", async () => {
      (getNivelByIdService as jest.Mock).mockRejectedValue(new Error());

      req = {
        params: { id: "1" },
        body: { nivel: "Junior" },
      };

      await updateNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao atualizar nível.",
      });
    });

    it("should update the level", async () => {
      (getNivelByIdService as jest.Mock).mockResolvedValue({ id: 1 });
      (updateNivelService as jest.Mock).mockResolvedValue({
        id: 1,
        nivel: "Junior",
      });

      req = {
        params: { id: "1" },
        body: { nivel: "Junior" },
      };

      await updateNivel(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ id: 1, nivel: "Junior" });
    });
  });

  describe("deleteNivel", () => {
    it("should return error 400 if id is not provided", async () => {
      req = {
        params: {},
      };

      await deleteNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 400 if id is not a number", async () => {
      req = {
        params: { id: "id" },
      };

      await deleteNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 404 if level is not found", async () => {
      (getNivelByIdService as jest.Mock).mockResolvedValue(null);

      req = {
        params: { id: "1" },
      };

      await deleteNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível não encontrado.",
      });
    });

    it("should return error 409 if there are developers with this level", async () => {
      (getNivelByIdService as jest.Mock).mockResolvedValue({ id: 1 });
      (getDesenvolvedorByNivelService as jest.Mock).mockResolvedValue([
        { id: 1 },
      ]);

      req = {
        params: { id: "1" },
      };

      await deleteNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: "Existem desenvolvedores com este nível.",
      });
    });

    it("should return error 500 if an error occurs", async () => {
      (getNivelByIdService as jest.Mock).mockRejectedValue(new Error());

      req = {
        params: { id: "1" },
      };

      await deleteNivel(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao remover nível.",
      });
    });
  });
});
