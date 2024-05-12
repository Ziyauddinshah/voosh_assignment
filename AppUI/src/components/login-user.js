import React, { useState } from "react";
import axios from "axios";

const LoginUserPage = () => {
  const [phoneno, setPhoneNo] = useState([]);
  const [password, setPassword] = useState([]);
  const [loginMessage, setLoginMessage] = useState([]);

  axios.defaults.withCredentials = true;

  const Login = () => {
    axios
      .post("http://localhost:3001/user/login-user", {
        phoneno: phoneno,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          console.log(response);
          localStorage.setItem("user_name", response.data.user_name);
          localStorage.setItem("jwt_token", response.data.jwt_token);
          alert("Login Successfully..");
          setLoginMessage(response.data.message);
        } else {
          console.log(response);
        }
      });
  };

  const loginMessageDisplay = () => {
    if (loginMessage === "Wrong login credentials!") {
      return <h6 className="text-danger">Wrong login credentials!</h6>;
    } else if (loginMessage === "Login Successfully..") {
      return <h6 className="text-success">Login Successfully..</h6>;
    } else if (loginMessage === "User does not exist!") {
      return <h6 className="text-danger">User does not exist!</h6>;
    }
  };
  return (
    <div className="container col-md-5 mt-5 p-5 bg-dark card shadow rounded text-light">
      <div className="text-center mb-2">
        <h5 className="">Login Here</h5>
      </div>
      <form>
        {loginMessageDisplay()}
        <div className="form-group mt-2">
          <label>Phone No</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="phoneHelp"
            placeholder="Enter Phone No"
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div
          className="btn-toolbar justify-content-between mt-4"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <button type="button" className="btn btn-success" onClick={Login}>
            Login
          </button>
          <div className="text-group-prepend">
            <label>
              New User?{" "}
              <a className="btn btn-primary" href="./add-user">
                SignUp
              </a>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginUserPage;
