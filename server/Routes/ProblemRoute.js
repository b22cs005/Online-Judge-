const express = require('express');
const router = express.Router();
const problemController = require('../Controllers/ProblemController');

router.get('/problems', problemController.getAllProblems);
router.post('/problems/add',problemController.enterPInDatabase);
router.delete('/problems/:id',problemController.delPfromDatabase);
router.put('/problems/:id',problemController.updatePInDatabase);
router.get('/problems/:id',problemController.getProblem);
router.post('/addProblemInUser',problemController.addProblemInUser);
module.exports = router;