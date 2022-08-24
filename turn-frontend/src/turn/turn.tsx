import React, { useState, useEffect } from "react";

import { Iturn, getTurnsByDateSchedule } from "./turn.service";

import { useErrorHandler } from "../common/utils/errorHandler";

import { DangerLabel } from "../common/components/DangerLabel";

export function Turn() {
    const [turns, setTurns] = useState<Iturn[]>([]);
    const [date, setDate] = useState<Date>(new Date());

    const errorHandler = useErrorHandler();

    const loadTurns = async () => {
        try {
            const result = await getTurnsByDateSchedule("2", date);
            setTurns(result);
        } catch (error) {
            errorHandler.newErrorGeneric("Error al buscar Turnos");
        }
    }


    useEffect(() => {
        void loadTurns();
    }, []);


    const formatDate = (date = new Date()): string => {
        return [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            (date.getDate()).toString().padStart(2, '0')
        ].join('-');
    }

    
    return (
        <div className="container">
            <h2 className="text-center m-4">Turnos</h2>

            {/* FECHA TURNO */}
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="fechaTurno" className="col-form-label">Fecha Turno</label>
                </div>
                <div className="col-auto">
                    <input type="date" id="fechaTurno" className="form-control" value={formatDate(date)} />
                </div>
            </div>

            {/* TABLA TURNOS */}
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th> Dia </th>
                        <th> Inicio </th>
                        <th> Fin </th>
                        <th> Estado </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {turns.map((turn, i) => {
                        return (
                            <tr key={i}>
                                <td>{turn.date.toString()}</td>
                                <td>{turn.start_time.toString()}</td>
                                <td>{turn.end_time.toString()}</td>
                                <td>{`state`}</td>


                                <td className="text">
                                    <button className="btn btn-primary">Solicitar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            <DangerLabel message={errorHandler.errorMessage} />

        </div>
    );
}
