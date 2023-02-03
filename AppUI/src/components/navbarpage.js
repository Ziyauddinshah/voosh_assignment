import React from 'react';
import { NavLink } from 'react-router-dom';
const NavbarPage = () => {

    let value = 1;
    let username = "";
    if (localStorage.getItem('user')) {
        username = localStorage.getItem('user');
        value = 0;
    }

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        value = 1;
        window.location.reload(false);
    }
    const loginCredential = () => {
        if (value === 1) {
            return <NavLink className="btn btn-outline-light " exact to="/login-user"><b>SignUp / SignIn</b></NavLink>;
        } else {
            return (
                <div className="row">
                    <div className="col-6 mt-1">
                        <NavLink className="text-white text-decoration-none" exact to="/userprofilepage">
                           Hi {username}
                        </NavLink>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary" onClick={Logout}>
                            logout
                        </button>
                    </div>
                </div>
            )
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info ">
            <div className="container ">
                <NavLink className="navbar-brand " exact to="/">
                    <h3 className="text-danger">Voosh Assignment</h3>
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " exact to="/"><h6> Home </h6></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link " exact to="/add-order"><h6> Add Order </h6></NavLink>
                        </li>
                    </ul>
                </div>
                {loginCredential()}
            </div>
        </nav>
    )
}

export default NavbarPage;
