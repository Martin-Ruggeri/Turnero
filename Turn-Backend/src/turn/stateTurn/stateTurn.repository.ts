"use strict";
import { pool } from "../../server/database"

import { IStateTurn } from "./stateTurn.model";

export async function findAll(): Promise<IStateTurn[]>{
    const sql: string = `SELECT * FROM STATE_TURN`;
    try{
        const { rows } = await pool.query(sql);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findAll) State_Turn`);
    }
}


export async function findById(code: string): Promise<IStateTurn> {
    const sql: string = `SELECT * FROM STATE_TURN WHERE STATE_TURN_CODE = $1`;
    const values = [code];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findById) State_Turn: { State_Turn_Code: ${code} }`);
    }
}

export async function findByName(name: string): Promise<IStateTurn> {
    const sql: string = `SELECT * FROM STATE_TURN WHERE STATE_NAME = $1`;
    const values = [name];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findByName) State_Turn: { State_Name: ${name} }`);
    }
}


export async function save(stateTurn: IStateTurn): Promise<IStateTurn> {
    const sql : string = `INSERT INTO STATE_TURN (STATE_TURN_CODE, STATE_NAME) VALUES ($1, $2)`;
    const values = [stateTurn.state_turn_code, stateTurn.state_name];
    try{
        await pool.query(sql, values);
        const newStateTurn = await findById(stateTurn.state_turn_code);
        return newStateTurn;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (save) State_Turn: ${JSON.stringify(stateTurn)}`);
    }
}


export async function removeById(code: string) {
    const sql: string = `DELETE FROM STATE_TURN WHERE STATE_TURN_CODE = $1`;
    const values = [code];
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (removeById) State_Turn: { State_Turn_Code: ${code} }`);
    }
}