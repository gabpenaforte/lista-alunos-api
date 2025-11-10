const alunosController = require("../controller/alunosController");
const Aluno = require("../model/alunosModel");

jest.mock("../model/alunosModel");

describe("alunosController tests", () => {
  describe("createAlunos", () => {
    it("should create a new aluno", async () => {
      const req = {
        body: {
          nome: "teste",
          email: "teste@gmail.com",
          cpf: "111.111.111-11",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAluno = {
        nome: "teste",
        email: "teste@gmail.com",
        cpf: "111.111.111-11",
      };

      Aluno.create.mockResolvedValue(mockAluno);
      await alunosController.createAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          aluno: mockAluno,
        },
      });
    });

    it("should handle errors when creating aluno", async () => {
      const req = {
        body: {
          nome: "teste",
          email: "teste@gmail.com",
          cpf: "111.111.111-11",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Erro ao criar aluno");

      Aluno.create.mockRejectedValue(mockError);
      await alunosController.createAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "erro",
        message: "Erro ao criar aluno",
        error: mockError.message,
      });
    });
  });

  describe("updateAlunos", () => {
    it("should update an existing aluno", async () => {
      const req = {
        params: { id: "12345" },
        body: {
          nome: "teste atualizado",
          email: "teste@gmail.com",
          cpf: "111.111.111-11",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUpdatedAluno = {
        nome: "teste atualizado",
        email: "teste@gmail.com",
        cpf: "111.111.111-11",
      };

      Aluno.findByIdAndUpdate.mockResolvedValue(mockUpdatedAluno);
      await alunosController.updateAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          aluno: mockUpdatedAluno,
        },
      });
    });

    it("should handle aluno not found when updating", async () => {
      const req = {
        params: { id: "12345" },
        body: {
          nome: "teste atualizado",
          email: "teste@gmail.com",
          cpf: "111.111.111-11",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Aluno.findByIdAndUpdate.mockResolvedValue(null);
      await alunosController.updateAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "falha",
        message: "Aluno não encontrado",
      });
    });

    it("should handle errors when updating aluno", async () => {
      const req = {
        params: { id: "12345" },
        body: {
          nome: "teste atualizado",
          email: "teste@gmail.com",
          cpf: "111.111.111-11",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Erro ao atualizar aluno");

      Aluno.findByIdAndUpdate.mockRejectedValue(mockError);
      await alunosController.updateAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "erro",
        message: "Erro ao atualizar aluno",
        error: mockError.message,
      });
    });
  });

  describe("deleteAlunos", () => {
    it("should delete an existing aluno", async () => {
      const req = {
        params: { id: "12345" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAluno = {
        _id: "12345",
        nome: "teste",
        email: "teste@gmail.com",
        cpf: "111.111.111-11",
      };

      Aluno.findById.mockResolvedValue(mockAluno);
      Aluno.findByIdAndDelete.mockResolvedValue(mockAluno._id);
      await alunosController.deleteAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        message: "Aluno deletado com sucesso",
      });
    });

    it("should handle aluno not found when deleting", async () => {
      const req = {
        params: { id: "12345" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Aluno.findById.mockResolvedValue(null);
      await alunosController.deleteAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "falha",
        message: "Aluno não encontrado",
      });
    });

    it("should handle errors when deleting aluno", async () => {
      const req = {
        params: { id: "12345" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Erro ao deletar aluno");

      Aluno.findById.mockRejectedValue(mockError);
      await alunosController.deleteAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "erro",
        message: "Erro ao deletar aluno",
        error: mockError.message,
      });
    });
  });

  describe("getAllAlunos", () => {
    it("should get all alunos", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAlunos = [
        { nome: "Aluno 1", email: "aluno1@teste.com", cpf: "111.111.111-11" },
        { nome: "Aluno 2", email: "aluno2@teste.com", cpf: "222.222.222-22" },
      ];

      Aluno.find.mockResolvedValue(mockAlunos);
      await alunosController.getAllAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          alunos: mockAlunos,
        },
      });
    });

    it("should handle errors when getting all alunos", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Erro ao buscar alunos");

      Aluno.find.mockRejectedValue(mockError);
      await alunosController.getAllAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "erro",
        message: "Erro ao buscar alunos",
        error: mockError.message,
      });
    });
  });

  describe("getAlunosById", () => {
    it("should get aluno by ID", async () => {
      const req = {
        params: { id: "12345" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAluno = {
        _id: "12345",
        nome: "teste",
        email: "teste@gmail.com",
        cpf: "111.111.111-11",
      };

      Aluno.findById.mockResolvedValue(mockAluno);
      await alunosController.getAlunosById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          aluno: mockAluno,
        },
      });
    });

    it("should handle aluno not found by ID", async () => {
      const req = {
        params: { id: "12345" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Aluno.findById.mockResolvedValue(null);
      await alunosController.getAlunosById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "falha",
        message: "Aluno não encontrado",
      });
    });

    it("should handle errors when getting aluno by ID", async () => {
      const req = {
        params: { id: "12345" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Erro ao buscar aluno por ID");

      Aluno.findById.mockRejectedValue(mockError);
      await alunosController.getAlunosById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "erro",
        message: "Erro ao buscar aluno por ID",
        error: mockError.message,
      });
    });
  });

  describe("filtersAlunos", () => {
    it("should filter alunos by nome", async () => {
      const req = {
        query: { nome: "teste" }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAlunos = [
        { nome: "teste", email: "teste@gmail.com", cpf: "111.111.111-11" }
      ]

      Aluno.find.mockResolvedValue(mockAlunos);
      await alunosController.filtersAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          alunos: mockAlunos,
        },
      });
    });

    it("should filter alunos by email", async () => {
      const req = {
        query: { email: "teste@gmail.com" }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAlunos = [
        { nome: "teste", email: "teste@gmail.com", cpf: "111.111.111-11" }
      ]

      Aluno.find.mockResolvedValue(mockAlunos);
      await alunosController.filtersAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          alunos: mockAlunos,
        },
      });
    });

    it("should filter alunos by cpf", async () => {
      const req = {
        query: { cpf: "111.111.111-11" }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAlunos = [
        { nome: "teste", email: "teste@gmail.com", cpf: "111.111.111-11" }
      ]

      Aluno.find.mockResolvedValue(mockAlunos);
      await alunosController.filtersAlunos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "sucesso",
        data: {
          alunos: mockAlunos,
        },
      });
    });

    it("should handle errors when filtering alunos", async () => {
      const req = {
        query: { nome: "teste" }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error("Erro ao filtrar alunos");

      Aluno.find.mockRejectedValue(mockError);
      await alunosController.filtersAlunos(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "erro",
        message: "Erro ao filtrar alunos",
        error: mockError.message,
      });
    });
  });
});
