"use strict";

import { IRol } from "./rol.model"
import { pool } from "../server/database"
import { IUser } from "../user/user.model";

export async function findAll(): Promise<IRol[]>{
    const sql: string = `SELECT * FROM ROL`;
    try{
        const { rows } = await pool.query(sql);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findAll) Rol`);
    }
}

export async function findById(id: number): Promise<IRol> {
    const sql: string = `SELECT * FROM ROL WHERE ROL_ID = $1`;
    const values = [id];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findById) Rol: { Id: ${id} }`);
    }
}

export async function findByName(rolName: string): Promise<IRol> {
    const sql: string = `SELECT * FROM ROL WHERE ROLNAME = $1`;
    const values = [rolName];
    try{
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findByName) Rol: { Rolname: ${rolName} }`);
    }
}

export async function findRolsByUser(user:IUser): Promise<IRol[]> {
    const sql: string =`SELECT R.ROL_ID, R.ROLNAME 
                        FROM USERS U
                            INNER JOIN USERS_ROL UR ON UR.USER_ID = U.USER_ID
                            INNER JOIN ROL R ON R.ROL_ID = UR.ROL_ID
                        WHERE U.USER_ID = $1`;
    const values = [user.user_id];
    try{
        const { rows } = await pool.query(sql, values);
        return rows;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (findRolsByUser) User: ${JSON.stringify(user)}`);
    }

}


export async function save(rol: IRol): Promise<IRol> {
    const sql: string = `INSERT INTO ROL (ROLNAME) VALUES ($1)`;
    const values = [rol.rolname];
    try{
        await pool.query(sql, values);
        const newRol = await findByName(rol.rolname);
        return newRol;
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (save) Rol: ${JSON.stringify(rol)}`);
    }
}


export async function removeById(id:number) {
    const sql: string = `DELETE FROM ROL WHERE ROL_ID = $1`;
    const values = [id];
    
    try{
        await pool.query(sql, values);
    }catch(error){
        console.error(error);
        throw new Error(`Error BD (removeById) Rol: { Id: ${id} }`);
    }
}