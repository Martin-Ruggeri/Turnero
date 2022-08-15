"use strict";

import { IRol } from "./rol.model"
import * as repository from "./rol.repository"; 

import { IUser } from "../user/user.model"


export async function findAll(): Promise<IRol[]>{
    try{
        const rols: IRol[] = await repository.findAll();
        return rols;
    }catch(error){
        console.log(`Error Service (findAll) Rol`);
        throw new Error(error);
    }
}

export async function findById(id: number): Promise<IRol> {
    try{
        const rol: IRol = await repository.findById(id);
        return rol;
    }catch(error){
        console.log(`Error Service (findById) Rol: { Id: ${id}}`);
        throw new Error(error);
    }
}

export async function findByName(rolName: string): Promise<IRol> {
    try{
        const rol: IRol = await repository.findByName(rolName);
        return rol;
    }catch(error){
        console.log(`Error Service (findByName) Rol: { Id: ${rolName}}`);
        throw new Error(error);
    }
}

export async function findRolsByUser(user:IUser): Promise<IRol[]> {
    try{
        const rols: IRol[] = await repository.findRolsByUser(user);
        return rols;
    }catch(error){
        console.log(`Error Service (findRolsByUser) User: ${JSON.stringify(user)}`);
        throw new Error(error);
    }
}

export async function save(rol: IRol): Promise<IRol> {
    try{
        const newRol: IRol = await repository.save(rol);
        return newRol;
    }catch(error){
        console.log(`Error Service (save) Rol: ${JSON.stringify(rol)}`);
        throw new Error(error);
    }
}


export async function removeById(id:number) {
    try{
        await repository.removeById(id);
    }catch(error){
        console.log(`Error Service (updateById) Rol: {Id: ${id}}`);
        throw new Error(error);
    }
}