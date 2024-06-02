const express = require("express");
const router = express.Router();
const compilerController = require ('../Controllers/CompilerController');
router.post("/run",compilerController.Compiler);
module.exports = router;