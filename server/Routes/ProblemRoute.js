const express = require('express');
const router = express.Router();
const problemController = require('../Controllers/ProblemController');

router.get('/problems', problemController.getAllProblems);

module.exports = router;