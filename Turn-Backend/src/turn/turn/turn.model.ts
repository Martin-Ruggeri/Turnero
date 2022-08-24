"use strict";

import { Time } from "../../util/Time";

export interface Iturn extends Document {
    turn_id : number;
    date: Date;
    start_time: Time;
    end_time: Time;
    schedule_id: number;
    user_id: number;
    state_turn_code: string;
    state_name: string;
}