"use strict";
import { IUser } from "../../user/user.model";
import { pool } from "../../server/database"

import { Iturn } from "./turn.model";
import { IStateTurn } from "../stateTurn/stateTurn.model";
import { Time } from "../../util/Time";

const sqlAll: string = `SELECT T.*, ST.STATE_NAME FROM TURN T INNER JOIN STATE_TURN ST ON ST.STATE_TURN_CODE = T.STATE_TURN_CODE`;

function parseTime(turns: Iturn[]) {
    for (const turn of turns) {
        turn.start_time = new Time(String(turn.start_time));
        turn.end_time =  new Time(String(turn.end_time));
    }

    return turns;
}

export async function findAll(): Promise<Iturn[]>{
    const sql: string = sqlAll;
    try{
        let { rows } = await pool.query(sql);
        rows = parseTime(rows);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findAll) Turn`);
    }
}


export async function findById(id: number): Promise<Iturn> {
    const sql: string = sqlAll + ` WHERE TURN_ID = $1`;
    const values = [id];
    try{
        let { rows } = await pool.query(sql, values);
        rows = parseTime(rows);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findById) Turn: { Id: ${id} }`);
    }
}


export async function findAllBySchedule(idSchedule: number): Promise<Iturn[]> {
    const sql: string = sqlAll + ` WHERE SCHEDULE_ID = $1`;
    const values = [idSchedule];
    try{
        let { rows } = await pool.query(sql, values);
        rows = parseTime(rows);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findAllBySchedule) Turn: { IdSchedule: ${idSchedule} }`);
    }
}

export async function findByDateSchedule(idSchedule: number, date: Date): Promise<Iturn[]> {
    const sql: string = sqlAll + ` WHERE SCHEDULE_ID = $1 AND DATE = $2`;
    const values = [idSchedule, date];
    try{
        let { rows } = await pool.query(sql, values);
        rows = parseTime(rows);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findByDateSchedule) Turn: { IdSchedule: ${idSchedule}, Date: ${date} }`);
    }
}

async function findByStartEndTimeSchedule(date: Date ,start_time: Time, end_time: Time, idSchedule: number): Promise<Iturn> {
    const sql: string = sqlAll + ` WHERE DATE = $1 AND START_TIME = $2 AND END_TIME = $3 AND SCHEDULE_ID = $4`;
    const values = [date, start_time.toString(), end_time.toString(), idSchedule];
    try{
        let { rows } = await pool.query(sql, values);
        rows = parseTime(rows);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findByStartEndTimeSchedule) Turn: { Start Time: ${start_time}, End Time: ${end_time}, Id Schedule: ${idSchedule} }`);
    }
}


export async function save(turn: Iturn): Promise<Iturn> {
    const sql : string = `INSERT INTO TURN (DATE, START_TIME, END_TIME, SCHEDULE_ID) VALUES ($1, $2, $3, $4)`;
    const values = [turn.date ,turn.start_time.toString(), turn.end_time.toString(), turn.schedule.schedule_id];
    try{
        await pool.query(sql, values);
        const newTurn = await findByStartEndTimeSchedule(turn.date ,turn.start_time, turn.end_time, turn.schedule.schedule_id);
        return newTurn;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (save) Turn: ${JSON.stringify(turn)}`);
    }
}


export async function removeById(id:number) {
    const sql: string = `DELETE FROM TURN WHERE TURN_ID = $1`;
    const values = [id];
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (removeById) Turn: { Id: ${id} }`);
    }
}

export async function addUserTurn( turn: Iturn, user: IUser) {
    const sql: string = `UPDATE TURN SET USER_ID = $1, UPDATE_ON = CURRENT_TIMESTAMP WHERE TURN_ID = $2`;
    const values = [user.user_id, turn.turn_id];
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (addUserTurn) Turn: { Id: ${turn.turn_id} }; User: { Id: ${user.user_id}}`);
    }
}

export async function removeUserTurn( turn: Iturn) {
    const sql: string = `UPDATE TURN SET USER_ID = NULL, UPDATE_ON = CURRENT_TIMESTAMP WHERE TURN_ID = $1`;
    const values = [turn.turn_id];
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (removeUserTurn) Turn: { Id: ${turn.turn_id} }`);
    }
}


export async function updateStateTurn( turn: Iturn, state: IStateTurn) {
    const sql: string = `UPDATE TURN SET STATE_TURN_CODE = $1, UPDATE_ON = CURRENT_TIMESTAMP WHERE TURN_ID = $2`;
    const values = [state.state_turn_code, turn.turn_id];
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (addUserTurn) Turn: { Id: ${turn.turn_id} }; State_Turn: { State_Turn_Code: ${state.state_turn_code}}`);
    }
}