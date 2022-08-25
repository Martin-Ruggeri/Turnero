import React, { useState, useEffect } from "react";

import { Iturn, getTurnsByDateSchedule, takeTurn } from "./turn.service";

import { useErrorHandler } from "../common/utils/errorHandler";

import { DangerLabel } from "../common/components/DangerLabel";

export function Turn() {
    const [turns, setTurns] = useState<Iturn[]>([]);

    const errorHandler = useErrorHandler();


    const loadTurns = async (date: Date = new Date()) => {
        try {
            const result = await getTurnsByDateSchedule("2", formatDate(date, "MM-DD-YYYY"));
            setTurns(result);
        } catch (error) {
            errorHandler.newErrorGeneric("Error al buscar Turnos");
        }
    }


    const onChangeDateTurn = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const miliseconds_day = 86400000;   // 1 dia
        loadTurns(new Date(new Date(event.target.value).getTime() + miliseconds_day));
    }


    const onClickSolicitar = async (turn: Iturn) => {
        await takeTurn(turn.turn_id);
        loadTurns(turn.date);
    }

    const formatDate = (date = new Date(), format = "YYYY-MM-DD"): string => {
        format = format.replace("YYYY", String(date.getFullYear()));
        format = format.replace("MM", (date.getMonth() + 1).toString().padStart(2, '0'));
        format = format.replace("DD", (date.getDate()).toString().padStart(2, '0'));

        return format;
    }


    useEffect(() => {
        void loadTurns();
    }, []);


    return (
        <div className="container">
            <h2 className="text-center m-4">Turnos</h2>

            {/* FECHA TURNO */}
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="dateTurn" className="col-form-label">Fecha Turno</label>
                </div>
                <div className="col-auto">
                    <input type="date" id="dateTurn" className="form-control" onChange={onChangeDateTurn} />
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
                                <td>{formatDate(turn.date, "DD/MM/YYYY")}</td>
                                <td>{turn.start_time.toString()}</td>
                                <td>{turn.end_time.toString()}</td>
                                <td>{turn.state_name}</td>


                                {turn.state_name === "Disponible" &&
                                    <td className="text"><button className="btn btn-primary" onClick={() => onClickSolicitar(turn)}>Solicitar</button> </td>
                                }

                                {turn.state_name !== "Disponible" &&
                                    <td className="text"></td>
                                }

                            </tr>
                        )
                    })}
                </tbody>
            </table>


            <DangerLabel message={errorHandler.errorMessage} />

        </div>
    );
}
