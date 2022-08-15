"use strict";
import { pool } from "../../server/database"

import { Iturn } from "./turn.model";

const sqlAll: string = `SELECT T.*, ST.STATE_NAME FROM TURN T INNER JOIN STATE_TURN ST ON ST.STATE_TURN_CODE = T.STATE_TURN_CODE`;

export async function findAll(): Promise<Iturn[]>{
    const sql: string = sqlAll;
    try{
        const { rows } = await pool.query(sql);
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
        const { rows } = await pool.query(sql, values);
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
        const { rows } = await pool.query(sql, values);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findAllBySchedule) Turn: { IdSchedule: ${idSchedule} }`);
    }
}

async function findByStartEndTimeSchedule(start_time: Date, end_time: Date, idSchedule: number): Promise<Iturn> {
    const sql: string = sqlAll + ` WHERE START_TIME = $1 AND END_TIME = $2 AND SCHEDULE_ID = $3`;
    const values = [start_time, end_time, idSchedule];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findByStartEndTimeSchedule) Turn: { Start Time: ${start_time}, End Time: ${end_time}, Id Schedule: ${idSchedule} }`);
    }
}


export async function save(turn: Iturn): Promise<Iturn> {
    const sql : string = `INSERT INTO TURN (START_TIME, END_TIME, SCHEDULE_ID) VALUES ($1, $2, $3)`;
    const values = [turn.start_time, turn.end_time, turn.schedule.schedule_id];
    try{
        await pool.query(sql, values);
        const newTurn = await findByStartEndTimeSchedule(turn.start_time, turn.end_time, turn.schedule.schedule_id);
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