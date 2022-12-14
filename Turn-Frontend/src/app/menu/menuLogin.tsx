import React from "react";
import { NavLink } from "react-router-dom";



export const MenuLogin = () => {

    return (
        <div className="container-fluid">
            {/* Logo */}
            <div className="logo">
                <NavLink to="/" className="navbar-brand">
                    <img src="favicon.ico" alt="" width="60" height="50" />
                </NavLink>
            </div>

            {/* Menu */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                </ul>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-outline-primary">
                        <NavLink to="/logIn" className="nav-link">Iniciar Sesión</NavLink>
                    </button>
                    <button className="btn btn-outline-secondary">
                        <NavLink to="/singUp" className="nav-link">Registrarte</NavLink>
                    </button>
                </div>
            </div>
        </div>

    );


};