"use strict";

import { Time } from "../../util/Time";
import { ISchedule } from "../../schedule/schedule.model";
import { IUser } from "../../user/user.model";
import { IStateTurn } from "../stateTurn/stateTurn.model";


export interface Iturn extends Document {
    turn_id : number;
    date: Date;
    start_time: Time;
    end_time: Time;
    schedule: ISchedule;
    user: IUser;
    state: IStateTurn;
}