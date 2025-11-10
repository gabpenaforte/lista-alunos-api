const express = require('express');
const alunosController = require('../controller/alunosController');

const router = express.Router();

router.post('/create', alunosController.createAlunos);
router.patch('/update/:id', alunosController.updateAlunos);
router.delete('/delete/:id', alunosController.deleteAlunos);

router.get('/filter', alunosController.filtersAlunos); 
router.get('/', alunosController.getAllAlunos);
router.get('/:id', alunosController.getAlunosById);

module.exports = router;