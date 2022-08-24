"use strict";

import { Time } from "../util/Time";

export interface ISchedule extends Document {
    schedule_id : number;
    name: string;
    description: string;
    start_day: Date;
    end_day: Date;
    start_time: Time;
    end_time: Time;
    interval_turn: number;
}