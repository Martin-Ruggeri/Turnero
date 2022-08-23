import React, { useState } from "react";

import { Input } from "../common/components/Input";
import { DangerLabel } from "../common/components/DangerLabel";
import { ErrorHandler, useErrorHandler } from "../common/utils/errorHandler";

import { login, ILogin } from "./authService";

import "./login.css";

export function Login() {

    const [form, setForm] = useState({} as ILogin);

    const error: ErrorHandler = useErrorHandler();


    // Carga la variable form con los datos ingresados en el formulario
    const handleChange = (e: any) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const loginClick = async () => {

        // VALIDACIONES
        error.clean();
        if (!form.email) error.add("email", "Correo requerido");
        if (!form.password) error.add("password", "Contraseña requerida");
        if (error.hasErrors()) return;


        try {
            const token = await login(form);
            alert('Token: ' + token.token);
        } catch (e) {
            error.newErrorGeneric("Usuario o Contraseña incorrecta");
        }
    }

    return (
        <section className="text-center">
            {/* Background image */}
            <div className="p-5 bg-image background-image"></div>

            {/* Formulario */}
            <div className="mx-auto background-form-login">
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-5">Iniciar Sesión</h2>
                            <div>
                                <Input
                                    label="Correo "
                                    name="email"
                                    type="text"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <DangerLabel message={error.errorMessage} />

                                <button className="btn btn-primary btn-lg m-3" onClick={loginClick}>Iniciar sesión</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}