const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const jwt_token = require("../jwt-token/jwt_token");

// getting all users
router.get("/get-all", jwt_token.verifyToken, userController.getAll);

//registration process
router.post("/add-user", userController.addUser);

//login process
router.post("/login-user", userController.login);

module.exports = router;
