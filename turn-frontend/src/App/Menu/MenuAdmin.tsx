import React from "react";
import { NavLink } from "react-router-dom";


export const MenuAdmin = () => {

    return (
        <div className="container-fluid">
            <div className="logo">
                <NavLink to="/" className="navbar-brand">
                    <img src="favicon.ico" alt="" width="50" height="40" />
                </NavLink>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-link">
                        <NavLink to="/turn" className="nav-link">Solicitar Turno</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/turn" className="nav-link">Gestionar Turno</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/schedule" className="nav-link">Gestionar Agendas</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/user" className="nav-link">Usuarios</NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );


};