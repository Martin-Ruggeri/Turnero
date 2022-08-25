import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSessionUser } from "../auth/userStore";

import "./home.css";

export function Home() {

    let navigate = useNavigate();

    const user = useSessionUser();

    useEffect(() => {
    }, []);

    return (
        <div className="Portada">
            <img id="Fondo-Portada" src="https://previews.123rf.com/images/kornienko/kornienko1412/kornienko141200041/34689168-instrumento-de-peluquer%C3%ADa-en-el-fondo-blanco.jpg" alt="" />

            <h1 className="m-4">Bienvenidos Barbería y Peluquería</h1>

            <button className="btn btn-primary btn-lg m-3" onClick={() => { user ? navigate("/schedule") : navigate("/login")}}>Solicitar Turno</button>
        </div>
    );
}
