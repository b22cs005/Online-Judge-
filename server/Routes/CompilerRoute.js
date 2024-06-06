const express = require("express");
const router = express.Router();
const compilerController = require ('../Controllers/CompilerController');
router.post("/run",compilerController.Compiler);
router.post("/submit/:id",compilerController.PassVerdict);
module.exports = router;