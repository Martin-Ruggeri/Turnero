import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Input } from "../common/components/Input";
import { DangerLabel } from "../common/components/DangerLabel";
import { ErrorHandler, useErrorHandler } from "../common/utils/errorHandler";
import { ISchedule } from "./schedule.service";
import * as serviceSchedule from "./schedule.service";


export function NewSchedule() {

    const [form, setForm] = useState({} as ISchedule);

    const error: ErrorHandler = useErrorHandler();

    let navigate = useNavigate();

    // Carga la variable form con los datos ingresados en el formulario
    const handleChange = (e: any) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const newScheduleClick = async () => {

        console.log(form);

        // VALIDACIONES
        error.clean();
        if (!form.name) error.add("name", "Nombre de Agenda requerido");
        if (!form.description) error.add("description", "Descripción de Agenda requerido");
        if (!form.start_day) error.add("start_day", "Dia Inicio requerido");
        if (!form.end_day) error.add("end_day", "Dia Fin requerida");
        if (!form.start_time) error.add("start_time", "Hora Inicio requerido");
        if (!form.end_time) error.add("end_time", "Hora Fin requerida");
        if (!form.interval_turn) error.add("interval_turn", "Intervalo requerido");
        if (error.hasErrors()) return;


        try {
            await serviceSchedule.save(form);
            navigate("/schedule", { replace: true });
        } catch (e) {
            error.newErrorGeneric("Error al Crear Agenda");
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
                                <Input
                                    label="Nombre Agenda"
                                    name="name"
                                    type="text"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Descripción Agenda"
                                    name="description"
                                    type="text"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Desde el"
                                    name="start_day"
                                    type="date"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Hasta el"
                                    name="end_day"
                                    type="date"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />


                                <Input
                                    label="Desde las"
                                    name="start_time"
                                    type="time"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Hasta las"
                                    name="end_time"
                                    type="time"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Duracion Turno"
                                    name="interval_turn"
                                    type="number"
                                    errorHandler={error}
                                    onChange={handleChange}
                                />

                                <DangerLabel message={error.errorMessage} />

                                <button className="btn btn-primary btn-lg m-3" onClick={newScheduleClick}>Crear Agenda</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
