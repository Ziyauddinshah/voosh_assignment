const db = require("../database/db");
const jwt_token = require("../jwt-token/jwt_token");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getAll = async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    db.query(query, (error, result) => {
      if (error) {
        res
          .status(202)
          .json({ message: "Something went worng in getAll, syntax error" });
      }
      res.status(200).json({ data: result });
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getAll" });
  }
};

const addUser = async (req, res) => {
  try {
    const user_name = req.body.user_name;
    const phone_no = req.body.phone_no;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hashpassword) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      const query = "INSERT INTO Users (Name,Phone_No,Password) VALUES(?,?,?)";
      db.query(query, [user_name, phone_no, hashpassword], (error, result) => {
        if (error) {
          return res.status(202).send({
            message: "Something went wrong! in addUser error, syntax error",
          });
        } else {
          const user = {
            user_name: user_name,
            phone_no: phone_no,
          };
          const token = jwt_token.generateToken(user);
          console.log("Generated JWT Token: ", token);
          res.status(200).json({ token: token, message: "Success!" });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in addUser" });
  }
};

const login = async (req, res) => {
  try {
    const phone_no = req.body.phoneno;
    const password = req.body.password;
    const query = "SELECT * FROM Users WHERE Phone_No = ?";
    db.query(query, [phone_no], (error1, result1) => {
      if (error1) {
        return res.status(202).send({
          message: "Something went wrong! in login error, syntax error",
        });
      } else {
        if (result1.length > 0) {
          bcrypt.compare(password, result1[0].Password, (error2, result2) => {
            if (error2) {
              res.status(202).json({ message: "Wrong login credentials!" });
            }
            const user = {
              user_name: result1[0].Name,
              phone_no: result1[0].Phone_No,
            };
            const token = jwt_token.generateToken(user);
            // console.log("Generated JWT Token: ", token);
            res.status(200).json({
              message: "Login successfully...",
              user_name: result1[0].Name,
              jwt_token: token,
            });
          });
        } else {
          res.status(202).json({ message: "User does not exist!" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in login" });
  }
};

module.exports = { getAll, addUser, login };
