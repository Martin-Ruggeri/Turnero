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