import React, { useState } from "react";
import orderService from "../services/orderService";

const SaveOrderPage = () => {
  const [userid, setUserId] = useState([]);
  const [subtotal, setSubTotal] = useState([]);
  const [phoneno, setPhoneNo] = useState([]);

  const SaveOrder = () => {
    const jwt_token = localStorage.getItem("jwt_token");
    orderService
      .addOrder(userid, subtotal, phoneno, jwt_token)
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          alert("error");
        }
      });
  };

  return (
    <div className="container col-md-5 mt-5 p-5 bg-dark card shadow rounded">
      <div className="text-center mb-2">
        <h5>Add Order Page</h5>
      </div>
      <form>
        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="User_Id *"
            required
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Sub Total *"
            required
            onChange={(e) => {
              setSubTotal(e.target.value);
            }}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone No *"
            required
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />
        </div>
        <div
          className="btn-toolbar justify-content-between mt-4"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <button type="submit" className="btn btn-success" onClick={SaveOrder}>
            {" "}
            Save Order{" "}
          </button>
        </div>
      </form>
    </div>
  );
};
export default SaveOrderPage;
