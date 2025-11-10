const express = require('express');
const alunosController = require('../controllers/alunosController');

const router = express.Router();

router.post('/create', alunosController.createAlunos);
router.patch('/update', alunosController.updateAlunos);
router.delete('/delete', alunosController.deleteAlunos);

router.get('/', alunosController.getAllAlunos);
router.get('/:id', alunosController.getAlunosById);

module.exports = router;