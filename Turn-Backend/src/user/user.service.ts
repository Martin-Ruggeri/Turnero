"use strict";
import { IUser } from "./user.model"
import * as repository from "./user.repository"; 

import { IRol } from "../rol/rol.model";
import * as serviceRol from "../rol/rol.service";

import * as serviceAuth from "../authorization/auth.service";


export async function findAll(): Promise<IUser[]> {
    try{
        const users: IUser[] = await repository.findAll();
        return users
    }catch(error){
        console.log(`Error Service (findAll) User`);
        throw new Error(error);
    }
}

export async function findById(id: number): Promise<IUser> {
    try{
        const user: IUser = await repository.findById(id);
        return user;
    }catch(error){
        console.log(`Error Service (findById) User: { Id: ${id}}`);
        throw new Error(error);
    }
}

export async function findByEmail(email: string): Promise<IUser> {
    try{
        const user: IUser = await repository.findByEmail(email);
        return user;
    }catch(error){
        console.log(`Error Service (findByEmail) User: { Email: ${email}}`);
        throw new Error(error);
    }
}


export async function save(user: IUser): Promise<IUser> {
    try{
        // Encriptar password
        user.password = await serviceAuth.encryptPassword(user.password);

        // Crear Usuario
        const newUser: IUser = await repository.save(user);

        // Asignarle rol por defecto 'customer'
        const rol: IRol = await serviceRol.findByName(`customer`);
        if (rol.rol_id) await addRolToUser(newUser.user_id, rol.rol_id);

        // Devolver usuario creado
        return newUser; 
    }catch(error){
        console.log(`Error Service (save) User: ${JSON.stringify(user)}`);
        throw new Error(error);
    }
}


export async function updateById(id:number, user: IUser): Promise<IUser> {
    try{
        const userUpdate: IUser = await repository.updateById(id, user);
        return userUpdate;
    }catch(error){
        console.log(`Error Service (updateById) User: ${JSON.stringify(user)} , Id: ${id}`);
        throw new Error(error);
    }
}

export async function removeById(id:number) {
    try{
        await repository.removeById(id);
    }catch(error){
        console.log(`Error Service (removeById) User: {Id: ${id}}`);
        throw new Error(error);
    }
}


export async function addRolToUser(idUser:number, idRol: number) {
    try{
        await repository.addRolToUser(idUser, idRol);
    }catch(error){
        console.log(`Error Service (addRolToUser) User: {Id: ${idUser}}; Rol: {Id: ${idRol}}`);
        throw new Error(error);
    }
}

export async function removeRolToUser(idUser:number, idRol: number)  {
    try{
        await repository.removeRolToUser(idUser, idRol);
    }catch(error){
        console.log(`Error Service (removeRolToUser) User: {Id: ${idUser}}; Rol: {Id: ${idRol}}`);
        throw new Error(error);
    }
}