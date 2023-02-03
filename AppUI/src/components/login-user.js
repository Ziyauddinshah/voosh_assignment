import React, { useState } from "react";
import axios from "axios";

const LoginUserPage = () => {

    const [phoneno, setPhoneNo] = useState([]);
    const [password, setPassword] = useState([]);
    const [loginMessage, setLoginMessage] = useState([]);

    axios.defaults.withCredentials = true;

    const Login = () => {
        axios.post("http://localhost:3001/login-user", {
            phoneno: phoneno,
            password: password
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                console.log("message ",response.data.message);
                setLoginMessage(response.data.message);   
            }
            else if(response.data != null) {
                console.log("data ",response.data.result[0]);
                localStorage.setItem('user', response.data.result[0].Name);
                localStorage.setItem('token', response.data.token);
                alert("Login Successfully..");
                setLoginMessage("Login Successfully..");
            }
            window.location.reload(false);
        });
    };

    const loginMessageDisplay = () => {
        if (loginMessage === 'Wrong login credentials!') {
            return <h6 className="text-danger">Wrong login credentials!</h6>;
        } else if (loginMessage === 'Login Successfully..') {
            return <h6 className="text-success">Login Successfully..</h6>;
        } else if (loginMessage === 'User does not exist!') {
            return <h6 className="text-danger">User does not exist!</h6>;
        }
    }
    return (
        <div className="container col-md-5 mt-5 p-5 bg-info card shadow rounded">
            <div className="text-center mb-2">
                <h5>Login Here</h5>
            </div>
            <form >
                {loginMessageDisplay()}
                <div className="form-group mt-2">
                    <label>Phone No</label>
                    <input type="text"
                        className="form-control"
                        aria-describedby="phoneHelp"
                        placeholder="Enter Phone No"
                        onChange={(e) => {
                            setPhoneNo(e.target.value);
                        }} />
                </div>
                <div className="form-group mt-2">
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
                <div className="btn-toolbar justify-content-between mt-4" role="toolbar" aria-label="Toolbar with button groups">
                    <button type="button"
                        className="btn btn-success"
                        onClick={Login} >Login</button>
                    <div className="text-group-prepend">
                        <label>New User? <a className="btn btn-primary" href="./add-user" >SignUp</a>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginUserPage;
