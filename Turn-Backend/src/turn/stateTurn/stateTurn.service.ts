"use strict";

import { IStateTurn } from "./stateTurn.model"
import * as repository from "./stateTurn.repository"; 


export async function findAll(): Promise<IStateTurn[]>{
    try{
        const stateTurn: IStateTurn[] = await repository.findAll();
        return stateTurn;
    }catch(error){
        console.log(`Error Service (findAll) State_Turn`);
        throw new Error(error);
    }
}

export async function findById(code: string): Promise<IStateTurn> {
    try{
        const stateTurn: IStateTurn = await repository.findById(code);
        return stateTurn;
    }catch(error){
        console.log(`Error Service (findById) State_Turn: { State_Turn_Code: ${code}}`);
        throw new Error(error);
    }
}

export async function findByName(name: string): Promise<IStateTurn> {
    try{
        const stateTurn: IStateTurn = await repository.findByName(name);
        return stateTurn;
    }catch(error){
        console.log(`Error Service (findById) State_Turn: { State_Name: ${name}}`);
        throw new Error(error);
    }
}

export async function save(stateTurn: IStateTurn): Promise<IStateTurn> {
    try{
        const newStateTurn: IStateTurn = await repository.save(stateTurn);
        return newStateTurn;
    }catch(error){
        console.log(`Error Service (save) State_Turn: ${JSON.stringify(stateTurn)}`);
        throw new Error(error);
    }
}

export async function removeById(code: string) {
    try{
        await repository.removeById(code);
    }catch(error){
        console.log(`Error Service (removeById) State_Turn: { State_Turn_Code: ${code}}`);
        throw new Error(error);
    }
}