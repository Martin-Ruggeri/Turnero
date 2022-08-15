"use strict";

export interface ISchedule extends Document {
    schedule_id : number;
    name: string;
    description: string;
    start_time: Date;
    end_time: Date;
    interval_turn: number;
}