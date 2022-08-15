"use strict";

import { ISchedule } from "../schedule/schedule.model";
import { IUser } from "../user/user.model";


export interface IStateTurn extends Document {
    state_turn_code: string;
    state_name: string;
}


export interface Iturn extends Document {
    turn_id : number;
    start_time: Date;
    end_time: Date;
    schedule: ISchedule;
    user: IUser;
    state: IStateTurn;
}