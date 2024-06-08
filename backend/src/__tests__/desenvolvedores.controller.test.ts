import { Request, Response } from "express";
import {
  getDesenvolvedores,
  createDesenvolvedor,
  updateDesenvolvedor,
  deleteDesenvolvedor,
} from "../controllers/desenvolvedores.controller";
import {
  getDesenvolvedoresService,
  createDesenvolvedorService,
  updateDesenvolvedorService,
  deleteDesenvolvedorService,
  getDesenvolvedorByIdService,
} from "../services/desenvolvedores.service";

jest.mock("../services/desenvolvedores.service");

describe("Desenvolvedores Controller test", () => {
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

  describe("getDesenvolvedores test", () => {
    it("should return error 500 if an error occurs", async () => {
      (getDesenvolvedoresService as jest.Mock).mockRejectedValue(new Error());

      req.query = { page: "1" };

      await getDesenvolvedores(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar desenvolvedores.",
      });
    });

    it("should return error 404 if no developers are found", async () => {
      (getDesenvolvedoresService as jest.Mock).mockResolvedValue({
        desenvolvedores: [],
        total: 0,
      });

      req.query = { page: "1" };

      await getDesenvolvedores(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nenhum desenvolvedor encontrado.",
      });
    });

    it("should return a list of developers", async () => {
      const mockDevelopers = [
        { id: 1, nome: "Dev1", data_nascimento: new Date(), nivel: {} },
      ];

      const mockTotal = 1;

      (getDesenvolvedoresService as jest.Mock).mockResolvedValue({
        desenvolvedores: mockDevelopers,
        total: mockTotal,
      });

      req.query = { page: "1" };

      await getDesenvolvedores(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mockDevelopers,
        meta: {
          total: mockTotal,
          per_page: 10,
          current_page: 1,
          last_page: 1,
        },
      });
    });
  });

  describe("createDesenvolvedor test", () => {
    it("should return error 400 if 'nome' is not provided", async () => {
      req.body = {
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome inválido.",
      });
    });

    it("should return error 400 if 'nome' is shorter than 3 characters", async () => {
      req.body = {
        nome: "Te",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome inválido.",
      });
    });

    it("should return error 400 if 'nome' is longer than 100 characters", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "a".repeat(101),
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome inválido.",
      });
    });

    it("should return error 400 if 'nivel_id' is not provided", async () => {
      req.body = {
        nome: "Test",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if 'nivel_id' is not a number", async () => {
      req.body = {
        nome: "Test",
        nivel_id: "a",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if 'nivel_id' is less than 1", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 0,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if 'sexo' is not provided", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Sexo inválido.",
      });
    });

    it("should return error 400 if 'sexo' is not M or F", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "X",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Sexo inválido.",
      });
    });

    it("should return error 400 if 'data_nascimento' is not provided", async () => {
      req.body = { nome: "Test", nivel_id: 1, sexo: "M", hobby: "Test" };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Data de nascimento inválida.",
      });
    });

    it("should return error 400 if 'data_nascimento' is not a valid date", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: "2021-13-01",
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Data de nascimento inválida.",
      });
    });

    it("should return error 400 if 'hobby' is not provided", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Hobby inválido.",
      });
    });

    it("should return error 400 if 'hobby' is shorter than 3 characters", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Te",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Hobby inválido.",
      });
    });

    it("should return error 400 if 'hobby' is longer than 300 characters", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "a".repeat(301),
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Hobby inválido.",
      });
    });

    it("should return error 500 if an error occurs", async () => {
      (createDesenvolvedorService as jest.Mock).mockRejectedValue(new Error());

      req.body = {
        id: 1,
        nivel_id: 1,
        nome: "Dev1",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao criar desenvolvedor.",
      });
    });

    it("should create a new developer", async () => {
      const mockDesenvolvedor = {
        id: 1,
        nivel_id: 1,
        nome: "Dev1",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      (createDesenvolvedorService as jest.Mock).mockResolvedValue(
        mockDesenvolvedor
      );

      req.body = mockDesenvolvedor;

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockDesenvolvedor);
    });
  });

  describe("updateDesenvolvedor test", () => {
    it("should return error 400 if 'id' is not provided", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      req.params = {};

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 400 if 'id' is not a number", async () => {
      req.params = { id: "a" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 400 if 'nome' is not provided", async () => {
      req.params = { id: "1" };
      req.body = {
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome inválido.",
      });
    });

    it("should return error 400 if 'nome' is shorter than 3 characters", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Te",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome inválido.",
      });
    });

    it("should return error 400 if 'nome' is longer than 100 characters", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "a".repeat(101),
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nome inválido.",
      });
    });

    it("should return error 400 if 'nivel_id' is not provided", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if 'nivel_id' is not a number", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: "a",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if 'nivel_id' is less than 1", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 0,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível inválido.",
      });
    });

    it("should return error 400 if 'sexo' is not provided", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Sexo inválido.",
      });
    });

    it("should return error 400 if 'sexo' is not M or F", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "X",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Sexo inválido.",
      });
    });

    it("should return error 400 if 'data_nascimento' is not provided", async () => {
      req.params = { id: "1" };
      req.body = { nome: "Test", nivel_id: 1, sexo: "M", hobby: "Test" };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Data de nascimento inválida.",
      });
    });

    it("should return error 400 if 'data_nascimento' is not a valid date", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: "2021-13-01",
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Data de nascimento inválida.",
      });
    });

    it("should return error 400 if 'hobby' is not provided", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Hobby inválido.",
      });
    });

    it("should return error 400 if 'hobby' is shorter than 3 characters", async () => {
      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Te",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Hobby inválido.",
      });
    });

    it("should return error 400 if 'hobby' is longer than 300 characters", async () => {
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "a".repeat(301),
      };

      await createDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Hobby inválido.",
      });
    });

    it("should return error 404 if developer is not found", async () => {
      (getDesenvolvedorByIdService as jest.Mock).mockResolvedValue(null);

      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Desenvolvedor não encontrado.",
      });
    });

    it("should return error 500 if an error occurs", async () => {
      (getDesenvolvedorByIdService as jest.Mock).mockRejectedValue(new Error());

      req.params = { id: "1" };
      req.body = {
        nome: "Test",
        nivel_id: 1,
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao atualizar desenvolvedor.",
      });
    });

    it("should update a developer", async () => {
      const mockDesenvolvedor = {
        id: 1,
        nivel_id: 1,
        nome: "Dev1",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      (getDesenvolvedorByIdService as jest.Mock).mockResolvedValue(
        mockDesenvolvedor
      );
      (updateDesenvolvedorService as jest.Mock).mockResolvedValue(
        mockDesenvolvedor
      );

      req.params = { id: "1" };
      req.body = mockDesenvolvedor;

      await updateDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDesenvolvedor);
    });
  });

  describe("deleteDesenvolvedor test", () => {
    it("should return error 400 if id is not provided", async () => {
      req.params = {};

      await deleteDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 400 if id is not a number", async () => {
      req.params = { id: "a" };

      await deleteDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Id inválido.",
      });
    });

    it("should return error 404 if developer is not found", async () => {
      (getDesenvolvedorByIdService as jest.Mock).mockResolvedValue(null);

      req.params = { id: "1" };

      await deleteDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Desenvolvedor não encontrado.",
      });
    });

    it("should return error 500 if an error occurs", async () => {
      (getDesenvolvedorByIdService as jest.Mock).mockRejectedValue(new Error());

      req.params = { id: "1" };

      await deleteDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao remover desenvolvedor.",
      });
    });

    it("should delete a developer", async () => {
      const mockDesenvolvedor = {
        id: 1,
        nivel_id: 1,
        nome: "Dev1",
        sexo: "M",
        data_nascimento: new Date(),
        hobby: "Test",
      };

      (getDesenvolvedorByIdService as jest.Mock).mockResolvedValue(
        mockDesenvolvedor
      );
      (deleteDesenvolvedorService as jest.Mock).mockResolvedValue(
        mockDesenvolvedor
      );

      req.params = { id: "1" };

      await deleteDesenvolvedor(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith(mockDesenvolvedor);
    });
  });
});
