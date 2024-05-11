const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const jwt_token = require("../jwt-token/jwt_token");

// adding order of a user
router.post("/add-order", jwt_token.verifyToken, orderController.addOrder);

// getting order details by userId
router.get(
  "/get-order/:id",
  jwt_token.verifyToken,
  orderController.getOrderByUserId
);

module.exports = router;
