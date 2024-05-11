const express = require("express");
const api = express.Router();

var data = {
  Name: "Abhi",
  Age: 25,
};

api.get("/", (req, res) => {
  res.send({ message: "Hello World! 2" });
});

api.get("/2", (req, res) => {
  res.send({ message: "Hello World! 2", data });
});

module.exports = api;
