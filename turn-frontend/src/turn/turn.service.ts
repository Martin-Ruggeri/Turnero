import axios from "axios";
import { environment } from "../app/environment/environment";

import { Time } from "../common/utils/Time";

import { currentUser } from "../auth/authService";

export interface Iturn {
    turn_id : number;
    date: Date;
    start_time: Time;
    end_time: Time;
    schedule_id: number;
    user_id: number;
    state_turn_code: string;
    state_name: string;
}

const url_turns = "/api/turn/";


function parseAll(turns: Iturn[]) {
    for (const turn of turns) {
        turn.start_time = new Time(turn.start_time.miliseconds);
        turn.end_time =  new Time(turn.end_time.miliseconds);
        turn.date = new Date(turn.date);
    }

    return turns;
}

function parse(turn: Iturn) {

    turn.start_time = new Time(turn.start_time.miliseconds);
    turn.end_time =  new Time(turn.end_time.miliseconds);
    turn.date = new Date(turn.date);

    return turn;
}

export async function getAll(): Promise<Iturn[]> {
    try {
        let res = (await axios.get(environment.backendUrl + url_turns)).data as Iturn[];
        res = parseAll(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getTurnsByDateSchedule(idSchedule: string, date: string): Promise<Iturn[]> {
    try {
        let res = (await axios.get(environment.backendUrl + url_turns + "schedule/" + idSchedule + "/" + date)).data as Iturn[];
        res = parseAll(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getId(id: number): Promise<Iturn> {
    try {
        let res = (await axios.get(environment.backendUrl + url_turns + id)).data as Iturn;
        res = parse(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function takeTurn(id: number): Promise<string> {
    try {
        const user = currentUser();
        let res = (await axios.post(environment.backendUrl + url_turns + id + "/user", user)).data as string;
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}