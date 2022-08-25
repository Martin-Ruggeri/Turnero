import axios from "axios"
import { environment } from "../app/environment/environment"

import { Time } from "../common/utils/Time";

export interface ISchedule {
    schedule_id : number;
    name: string;
    description: string;
    start_day: Date;
    end_day: Date;
    start_time: Time;
    end_time: Time;
    interval_turn: number;
}

const url_schedule = "/api/schedule/";

function parseTimeAll(schedules: ISchedule[]) {
    for (const schedule of schedules) {
        schedule.start_time = new Time(schedule.start_time.miliseconds);
        schedule.end_time =  new Time(schedule.end_time.miliseconds);
    }

    return schedules;
}

function parseTime(schedule: ISchedule) {

        schedule.start_time = new Time(schedule.start_time.miliseconds);
        schedule.end_time =  new Time(schedule.end_time.miliseconds);

    return schedule;
}

export async function getAll(): Promise<ISchedule[]> {
    try {
        let res = (await axios.get(environment.backendUrl + url_schedule)).data as ISchedule[];
        res = parseTimeAll(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getId(id: string): Promise<ISchedule> {
    try {
        let res = (await axios.get(environment.backendUrl + url_schedule + id)).data as ISchedule;
        res = parseTime(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function save(payload: ISchedule): Promise<ISchedule> {
    try {
        let res = (await axios.post(environment.backendUrl + url_schedule, payload)).data as ISchedule;
        res = parseTime(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}
