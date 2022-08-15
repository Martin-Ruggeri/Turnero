"use strict";

import { ISchedule } from "../../schedule/schedule.model";
import { IUser } from "../../user/user.model";
import { IStateTurn } from "../stateTurn/stateTurn.model";


export interface Iturn extends Document {
    turn_id : number;
    start_time: Date;
    end_time: Date;
    schedule: ISchedule;
    user: IUser;
    state: IStateTurn;
}