import React, { useState } from "react";

import { Input } from "../common/components/Input";
import { DangerLabel } from "../common/components/DangerLabel";
import { ErrorHandler, useErrorHandler } from "../common/utils/errorHandler";

import { singUp, ISignUp } from "./authService";

import "./auth.css";

export function SingUp() {

    const [form, setForm] = useState({} as ISignUp);

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
        if (!form.name) error.add("name", "Nombre requerido");
        if (!form.lastname) error.add("lastname", "Apellido requerido");
        if (!form.email) error.add("email", "Correo requerido");
        if (!form.password) error.add("password", "Contraseña requerida");
        if (error.hasErrors()) return;


        try {
            const token = await singUp(form);
            alert('Token: ' + token.token);
        } catch (e) {
            error.add("email", "El correo ya existe");
        }
    }


    return (

        <section className="text-center">
            {/* Background image */}
            <div className="p-5 bg-image background-image"></div>

            {/* Formulario */}
            <div className="mx-4 mx-md-5 shadow-5-strong background-form">
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-5">Create una Cuenta</h2>
                            <div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <Input
                                            label="Nombre"
                                            name="name"
                                            type="text"
                                            errorHandler={error}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <Input
                                            label="Apellido"
                                            name="lastname"
                                            type="text"
                                            errorHandler={error}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <Input
                                    label="Correo"
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

                                <button className="btn btn-primary btn-lg m-3" onClick={loginClick}>Crear Cuenta</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
