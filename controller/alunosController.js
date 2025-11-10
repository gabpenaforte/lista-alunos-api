const Aluno = require("../model/alunosModel");

exports.createAlunos = async (req, res) => {
  try {
    const newAluno = await Aluno.create({
      nome: req.body.nome,
      email: req.body.email,
      cpf: req.body.cpf,
    });

    res.status(201).json({
      status: "sucesso",
      data: {
        aluno: newAluno,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "erro",
      message: "Erro ao criar aluno",
      error: err.message,
    });
  }
};

exports.updateAlunos = async (req, res) => {
  try {
    const allowedFields = {
      nome: req.body.nome,
      email: req.body.email,
      cpf: req.body.cpf,
    };

    const updatedAluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAluno) {
      return res.status(404).json({
        status: "falha",
        message: "Aluno não encontrado",
      });
    }

    res.status(200).json({
      status: "sucesso",
      data: {
        aluno: updatedAluno,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "erro",
      message: "Erro ao atualizar aluno",
      error: err.message,
    });
  }
};

exports.deleteAlunos = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);

    if (!aluno) {
      return res.status(404).json({
        status: "falha",
        message: "Aluno não encontrado",
      });
    }

    await Aluno.findByIdAndDelete(aluno._id);

    res.status(204).json({
      status: "sucesso",
      message: "Aluno deletado com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      status: "erro",
      message: "Erro ao deletar aluno",
      error: err.message,
    });
  }
};

exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();

    res.status(200).json({
      status: "sucesso",
      data: {
        alunos,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "erro",
      message: "Erro ao buscar alunos",
      error: err.message,
    });
  }
};

exports.getAlunosById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);

    if (!aluno) {
      return res.status(404).json({
        status: "falha",
        message: "Aluno não encontrado",
      });
    }

    res.status(200).json({
      status: "sucesso",
      data: {
        aluno,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "erro",
      message: "Erro ao buscar aluno por ID",
      error: err.message,
    });
  }
};

exports.filtersAlunos = async (req, res) => {
  try {
    const query = {};
    
    if (req.query.nome) {
      query.nome = { $regex: new RegExp(req.query.nome, 'i') }; 
    }
    if (req.query.email) {
      query.email = { $regex: new RegExp(req.query.email, 'i') };
    }
    if (req.query.cpf) {
      query.cpf = req.query.cpf; 
    }

    const alunos = await Aluno.find(query);

    res.status(200).json({
      status: "sucesso",
      data: {
        alunos,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "erro",
      message: "Erro ao filtrar alunos",
      error: err.message,
    });
  }
};
