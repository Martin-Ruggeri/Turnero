"use strict";
import { Time } from "../../util/Time";

import * as serviceStateTurn from "../stateTurn/stateTurn.service";
import * as serviceTurn from "../turn/turn.service";

import { ISchedule } from "../../schedule/schedule.model";
import { IStateTurn } from "../stateTurn/stateTurn.model";
import { Iturn } from "./turn.model";

export async function generateTurns(schedule: ISchedule) {
    // Variables Globales
    let turns: Iturn[] = [];
    let state_libre: IStateTurn = await serviceStateTurn.findById("DISP");


    // Dias Maximos: cantidad de dias que se deben crear por Agenda. EJ: dia inicio: 10/10/2022 , dia fin: 15/10/2022 => day_max = 6
    const day_max = ((schedule.end_day.getTime() - schedule.start_day.getTime()) / (1000 * 3600 * 24)) + 1;

    // Turnos maximos: cantidad de turnos por horario. EJ: horario: 08:00 a 09:10 con turno de 20 minutos => turns_max = 3
    const start_time_minutes = schedule.start_time.getHours() * 60 + schedule.start_time.getMinutes();
    const end_time_minutes = schedule.end_time.getHours() * 60 + schedule.end_time.getMinutes();
    const turns_max = Math.trunc((end_time_minutes - start_time_minutes) / schedule.interval_turn);


    // Por cada Dia
    let day_turn: Date = new Date(schedule.start_day.getTime());
    for (let i = 0; i < day_max; i++) {

        // Por cada Turno
        let start_time: Time = new Time(schedule.start_time.toString());
        for (let j = 0; j < turns_max; j++) {
            let end_time: Time = new Time(start_time.toString());
            end_time.setMinutes(end_time.getMinutes() + schedule.interval_turn);


            // Crear Turn
            let turn = {
                "date": day_turn,
                "start_time": start_time,
                "end_time": end_time,
                "schedule": schedule,
                "state": state_libre
            }

            const newTurn : Iturn = await serviceTurn.save(turn as Iturn);
            
            turns.push(newTurn);

            start_time = end_time;
        }

        day_turn.setDate(day_turn.getDate() + 1);
    }

    return turns;
}


// console.log(`Dia ${day_turn.getDate()}/${day_turn.getMonth()}  --  Hora Inicio: ${start_time.toString()}  --  Hora Fin: ${end_time.toString()}`);