"use strict";

import { Day } from "../util/enum.day"; 

export interface ISchedule extends Document {
    schedule_id : number;
    name: string;
    description: string;
    days: Day[],
    start_time: Date;
    end_time: Date;
    interval_turn: number;
}