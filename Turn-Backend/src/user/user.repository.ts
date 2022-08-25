"use strict";

import { IUser } from "./user.model"
import { IRol } from "../rol/rol.model";
import { pool } from "../server/database"

export async function findAll(): Promise<IUser[]> {
    const sql: string = `SELECT * FROM USERS`;
    try {
        const { rows } = await pool.query(sql);
        const users: IUser[] = rows;
        for (const user of users) {
            user.roles = await findRolsToUser(user.user_id);
        }
        return users;
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (findAll) User`);
    }
}

export async function findById(id: number): Promise<IUser> {
    const sql: string = `SELECT * FROM USERS WHERE USER_ID = $1`;
    const values = [id];
    try {
        const { rows } = await pool.query(sql, values);
        const user: IUser = rows[0];
        user.roles = await findRolsToUser(user.user_id);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (findById) User: { Id: ${id} }`);
    }
}

export async function findByEmail(email: string): Promise<IUser> {
    const sql: string = `SELECT * FROM USERS WHERE EMAIL = $1`;
    const values = [email];
    try {
        const { rows } = await pool.query(sql, values);
        const user: IUser = rows[0];
        user.roles = await findRolsToUser(user.user_id);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (findByEmail) User: { Email: ${email} }`);
    }
}

export async function save(user: IUser): Promise<IUser> {
    const sql: string = `INSERT INTO USERS (NAME, LASTNAME, PASSWORD, EMAIL) VALUES ($1, $2, $3, $4)`;
    const values = [user.name, user.lastname, user.password, user.email];
    try {
        await pool.query(sql, values);
        const newUser = await findByEmail(user.email);
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (save) User: ${JSON.stringify(user)}`);
    }
}

export async function updateById(id: number, userUpdate: IUser): Promise<IUser> {

    let user: IUser = await findById(id);

    if (userUpdate.name) user.name = userUpdate.name;
    if (userUpdate.lastname) user.lastname = userUpdate.lastname;
    if (userUpdate.password) user.password = userUpdate.password;
    if (userUpdate.email) user.email = userUpdate.email;

    const sql: string = `UPDATE USERS SET NAME = $1, LASTNAME = $2, PASSWORD = $3, EMAIL = $4, UPDATE_ON = CURRENT_TIMESTAMP WHERE USER_ID = $5`;
    const values = [user.name, user.lastname, user.password, user.email, id];
    try {
        await pool.query(sql, values);
        const updateUser = await findByEmail(user.email);
        return updateUser;
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (updateById) User: ${JSON.stringify(user)}`);
    }
}


export async function removeById(id: number) {
    const sql: string = `DELETE FROM USERS WHERE USER_ID = $1`;
    const values = [id];

    try {
        await pool.query(sql, values);
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (removeById) User: { Id: ${id} }`);
    }
}

async function findRolsToUser(idUser: number): Promise<IRol[]> {
    const sql: string =`SELECT R.ROL_ID, R.ROLNAME 
                        FROM USERS_ROL UR
                            INNER JOIN ROL R ON R.ROL_ID = UR.ROL_ID
                        WHERE UR.USER_ID = $1`;
    const values = [idUser];
    try{
        const { rows } = await pool.query(sql, values);
        return rows as IRol[];
    }catch(error) {
        console.error(error);
        throw new Error(`Error BD (findRolsToUser) User: {idUser: ${idUser}}}`);
    }
}

export async function addRolToUser(idUser: number, idRol: number) {
    const sql: string = `INSERT INTO USERS_ROL (USER_ID, ROL_ID) VALUES ($1, $2)`;
    const values = [idUser, idRol];

    try {
        await pool.query(sql, values);
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (addRolToUser) User: { Id: ${idUser} }; Rol: { Id: ${idRol}}`);
    }
}


export async function removeRolToUser(idUser: number, idRol: number) {
    const sql: string = `DELETE FROM USERS_ROL WHERE USER_ID = $1 AND ROL_ID = $2`;
    const values = [idUser, idRol];

    try {
        await pool.query(sql, values);
    } catch (error) {
        console.error(error);
        throw new Error(`Error BD (removeRolToUser) User: { Id: ${idUser} }; Rol: { Id: ${idRol}}`);
    }
}