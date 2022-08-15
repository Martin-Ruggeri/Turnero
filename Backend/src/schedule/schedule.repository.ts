"use strict";
import { pool } from "../server/database"

import { ISchedule } from "./schedule.model";


export async function findAll(): Promise<ISchedule[]>{
    const sql: string = `SELECT * FROM SCHEDULE`;
    try{
        const { rows } = await pool.query(sql);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findAll) Schedule`);
    }
}


export async function findById(id: number): Promise<ISchedule> {
    const sql: string = `SELECT * FROM SCHEDULE WHERE SCHEDULE_ID = $1`;
    const values = [id];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findById) Schedule: { Id: ${id} }`);
    }
}


export async function findByName(name: string): Promise<ISchedule> {
    const sql: string = `SELECT * FROM SCHEDULE WHERE NAME = $1`;
    const values = [name];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findByName) Schedule: { Name: ${name} }`);
    }
}


export async function save(schedule: ISchedule): Promise<ISchedule> {
    const sql: string = `INSERT INTO SCHEDULE (NAME, DESCRIPTION, START_TIME, END_TIME, INTERVAL_TURN) VALUES ($1, $2, $3, $4, $5)`;
    const values = [schedule.name, schedule.description, schedule.start_time, schedule.end_time, schedule.interval_turn];
    try{
        await pool.query(sql, values);
        const newSchedule = await findByName(schedule.name);
        return newSchedule;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (save) Schedule: ${JSON.stringify(schedule)}`);
    }
}

export async function updateById(id:number, scheduleUpdate: ISchedule): Promise<ISchedule> {

    let schedule: ISchedule = await findById(id);

    if (scheduleUpdate.name)         schedule.name          = scheduleUpdate.name;
    if (scheduleUpdate.description)  schedule.description   = scheduleUpdate.description;
    if (scheduleUpdate.start_time)   schedule.start_time    = scheduleUpdate.start_time;
    if (scheduleUpdate.end_time)     schedule.end_time      = scheduleUpdate.end_time;
    if (scheduleUpdate.interval_turn)schedule.interval_turn = scheduleUpdate.interval_turn;

    const sql: string = `UPDATE SCHEDULE SET NAME = $1, DESCRIPTION = $2, START_TIME = $3, END_TIME = $4, INTERVAL_TURN = $5, UPDATE_ON = CURRENT_TIMESTAMP WHERE SCHEDULE_ID = $6`;
    const values = [schedule.name, schedule.description, schedule.start_time, schedule.end_time, schedule.interval_turn, id];
    try{
        await pool.query(sql, values);
        const updateUser = await findByName(schedule.name);
        return updateUser;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (updateById) Schedule: ${JSON.stringify(scheduleUpdate)}`);
    }
}


export async function removeById(id:number) {
    const sql: string = `DELETE FROM SCHEDULE WHERE SCHEDULE_ID = $1`;
    const values = [id];
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (removeById) Schedule: { Id: ${id} }`);
    }
}