const db = require("../database/db");

const addOrder = async (req, res) => {
  const userId = req.body.userid;
  const subTotal = req.body.subtotal;
  const phoneNo = req.body.phoneno;
  const sqlInsert =
    "INSERT INTO Order_Details (User_Id,Sub_Total,Phone_No) VALUES(?,?,?)";
  db.query(sqlInsert, [userId, subTotal, phoneNo], (error, result) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      //console.log(result);
      res.send({ message: "Success !" });
    }
  });
};

const getOrderByUserId = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const auth = authHeader.split(" ");
  const userid = req.params.id;
  //console.log(userid,auth[1]);
  const sqlSelect = `SELECT * FROM Order_Details where User_Id = ${userid}`;
  db.query(sqlSelect, (error, result) => {
    //console.log(result);
    res.send(result);
  });
};

module.exports = { addOrder, getOrderByUserId };
