const express = require('express');
const authController = require('../controllers/auht.controller')

const authRouter = express.Router();
  

authRouter.post("/register", authController.registerController)

authRouter.post("/login", authController.loginController)

module.exports = authRouter;