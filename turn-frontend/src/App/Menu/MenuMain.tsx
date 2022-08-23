import React from "react";
import { NavLink } from "react-router-dom";

import { logout } from "../../auth/authService";

export const MenuMain = () => {

    return (
        <div className="container-fluid">
            {/* Logo */}
            <div className="logo">
                <NavLink to="/" className="navbar-brand">
                    <img src="favicon.ico" alt="" width="50" height="40" />
                </NavLink>
            </div>

            {/* Menu */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-link">
                        <NavLink to="/turn" className="nav-link">Solicitar Turno</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
                    </li>
                </ul>
            </div>

            {/* Logout */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-link">
                    <NavLink to="/" onClick={logout} className="nav-link">
                        <img src="/assets/logout.png" alt="#" width="25" height="24" /> Salir
                    </NavLink>
                </li>
            </ul>
        </div>
    );


};