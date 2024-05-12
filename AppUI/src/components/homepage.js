import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import orderService from "../services/orderService";

const HomePage = () => {
  const [showusers, setShowUsers] = useState([]);
  const [name, setName] = useState([]);
  const [phoneNo, setPhoneNo] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  useEffect(() => {
    const jwt_token = localStorage.getItem("jwt_token");
    userService.getAllUserService(jwt_token).then((response) => {
      setShowUsers(response.data.data);
    });
  }, []);

  const DisplayOrder = (User_Id, name) => {
    const jwt_token = localStorage.getItem("jwt_token");
    setName(name);
    orderService.getOrderByUserId(User_Id, jwt_token).then((response) => {
      if (response.data.data.length) {
        setPhoneNo(response.data.data[0].Phone_No);
        setSubTotal(response.data.data[0].Sub_Total);
      } else {
        console.log("no data");
      }
    });
  };
  return (
    <div className="container col-md-10 mt-5 mb-2 p-3">
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">All Users</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">User_Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Order Details</th>
                  </tr>
                </thead>
                <tbody>
                  {showusers &&
                    showusers.map((val, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{val.User_Id}</th>
                          <td>{val.Name}</td>
                          <td>{val.Phone_No}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              type="button"
                              onClick={() =>
                                DisplayOrder(val.User_Id, val.Name)
                              }
                            >
                              Get Details
                            </button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Order Details</h5>
              <br />
              <p>User Name: {name}</p>
              <p>Phone No: {phoneNo}</p>
              <p>
                Sub Total: <b>{subTotal}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
