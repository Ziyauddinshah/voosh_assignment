const db = require("../database/db");

const addOrder = async (req, res) => {
  try {
    const user_id = req.body.userid;
    const subTotal = req.body.subtotal;
    const phone_no = req.body.phoneno;
    const query =
      "INSERT INTO Order_Details (User_Id,Sub_Total,Phone_No) VALUES(?,?,?)";
    db.query(query, [user_id, subTotal, phone_no], (error, result) => {
      if (error) {
        res.status(202).json({
          message: "Something went worng in addOrder, syntax error",
        });
      }
      res.status(200).json({ data: result, message: "Success" });
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in addOrder" });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const user_id = req.params.id;
    console.log(user_id);
    const query = `SELECT * FROM Order_Details where User_Id = ${user_id}`;
    db.query(query, (error, result) => {
      if (error) {
        res.status(202).json({
          message: "Something went worng in getOrderByUserId, syntax error",
        });
      }
      res.status(200).json({ data: result });
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching in getOrderByUserId" });
  }
};

module.exports = { addOrder, getOrderByUserId };
