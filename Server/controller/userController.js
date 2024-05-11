const db = require("../database/db");
const jwt_token = require("../jwt-token/jwt_token");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getAll = async (req, res) => {
  const sqlSelect = "SELECT * FROM Users";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
};

const addUser = async (req, res) => {
  const name = req.body.name;
  const phoneno = req.body.phoneno;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hashpassword) => {
    if (err) res.send(err);
    const sqlInsert =
      "INSERT INTO Users (Name,Phone_No,Password) VALUES(?,?,?)";
    db.query(sqlInsert, [name, phoneno, hashpassword], (error) => {
      if (error) {
        res.send(error);
      } else {
        const user = {
          id: name,
          phoneNo: phoneno,
        };
        const token = jwt_token.generateToken(user);
        console.log("Generated JWT Token: ", token);
        res.send({ token: token, message: "Success !" });
      }
    });
  });
};

const login = async (req, res) => {
  const phoneno = req.body.phoneno;
  const password = req.body.password;
  const sqlInsert = "SELECT * FROM Users WHERE Phone_No = ?";
  db.query(sqlInsert, [phoneno], (error, result) => {
    if (error) res.send({ error: error });
    if (result.length > 0) {
      bcrypt.compare(password, result[0].Password, (err, res) => {
        if (err) {
          console.log(err);
          res.send({ message: "Wrong login credentials!" });
        } else if (res) {
          const user = {
            id: result[0].Name,
            phoneNo: result[0].Phone_No,
          };
          const token = jwt_token.generateToken(user);
          console.log("Generated JWT Token: ", token);
          res.send({ result, token: token });
        }
      });
    } else {
      res.send({ message: "User does not exist!" });
    }
  });
};

module.exports = { getAll, addUser, login };
