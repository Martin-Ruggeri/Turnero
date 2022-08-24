import React, { useState, useEffect } from "react";

import { ISchedule, getAll } from "./schedule.service";

import { Time } from "../common/utils/Time";
import { useErrorHandler } from "../common/utils/errorHandler";

import { DangerLabel } from "../common/components/DangerLabel";
import { Link } from "react-router-dom";

export function Schedule() {
    const [schedules, setSchedule] = useState<ISchedule[]>([]);

    const errorHandler = useErrorHandler();

    const loadSchedules = async () => {
        try {
            const result = await getAll();
            setSchedule(result);
        } catch (error) {
            errorHandler.newErrorGeneric("Error al buscar Agendas");
        }
    }

    useEffect(() => {
        void loadSchedules();
    }, []);

    return (
        <div className="list-group ">
            <h2 className="text-center m-4">Agendas</h2>
            {schedules.map((schedule, i) => {
                return (
                    <Link to="/turn" className="mt-2 list-group-item list-group-item-action active" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{schedule.name}</h5>
                            <small>{`Hora Inicio: ${schedule.start_time}`}</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="mb-1">{schedule.description}</p>
                            <small>{`Hora Fin: ${schedule.end_time}`}</small>
                        </div>
                    </Link>
                );
            })}

        </div>
    );
}
