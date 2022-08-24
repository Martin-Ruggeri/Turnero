import axios from "axios"
import { environment } from "../app/environment/environment"

import { ISchedule } from "../schedule/schedule.service";
import { IUser } from "../user/user.service";
import { Time } from "../common/utils/Time";

export interface Iturn {
    turn_id : number;
    date: Date;
    start_time: Time;
    end_time: Time;
    schedule: ISchedule;
    user: IUser;
    state: IStateTurn;
}

export interface IStateTurn {
    state_turn_code: string;
    state_name: string;
}

const url_turns = "/api/turn/";


function parseTimeAll(turns: Iturn[]) {
    for (const turn of turns) {
        turn.start_time = new Time(turn.start_time.miliseconds);
        turn.end_time =  new Time(turn.end_time.miliseconds);
    }

    return turns;
}

function parseTime(turn: Iturn) {

    turn.start_time = new Time(turn.start_time.miliseconds);
    turn.end_time =  new Time(turn.end_time.miliseconds);

    return turn;
}

export async function getAll(): Promise<Iturn[]> {
    try {
        let res = (await axios.get(environment.backendUrl + url_turns)).data as Iturn[]
        res = parseTimeAll(res);
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getTurnsByDateSchedule(idSchedule: string, date: Date): Promise<Iturn[]> {
    try {
        let res = (await axios.get(environment.backendUrl + url_turns + "schedule/" + idSchedule + "/" + date)).data as Iturn[]
        res = parseTimeAll(res);
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getId(id: string): Promise<Iturn> {
    try {
        let res = (await axios.get(environment.backendUrl + url_turns + id)).data as Iturn
        res = parseTime(res);
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function save(payload: Iturn): Promise<Iturn> {
    try {
        let res = (await axios.post(environment.backendUrl + url_turns, payload)).data as Iturn
        res = parseTime(res);
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}