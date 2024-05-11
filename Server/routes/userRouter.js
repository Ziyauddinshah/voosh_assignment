const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// getting all users
router.get("/get-all", userController.getAll);

//registration process
router.post("/add-user", userController.addUser);

//login process
router.post("/login-user", userController.login);

module.exports = router;
