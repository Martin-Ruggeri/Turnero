"use strict";

import { Iturn } from "./turn.model"
import * as repository from "./turn.repository"; 


export async function findAll(): Promise<Iturn[]>{
    try{
        const turns: Iturn[] = await repository.findAll();
        return turns;
    }catch(error){
        console.log(`Error Service (findAll) Turn`);
        throw new Error(error);
    }
}

export async function findById(id: number): Promise<Iturn> {
    try{
        const turn: Iturn = await repository.findById(id);
        return turn;
    }catch(error){
        console.log(`Error Service (findById) Turn: { Id: ${id}}`);
        throw new Error(error);
    }
}

export async function findAllBySchedule(idSchedule: number): Promise<Iturn> {
    try{
        const turns: Iturn = await repository.findAllBySchedule(idSchedule);
        return turns;
    }catch(error){
        console.log(`Error Service (findByName) Turn: { Id Schedule: ${idSchedule}}`);
        throw new Error(error);
    }
}

export async function save(turn: Iturn): Promise<Iturn> {
    try{
        const newTurn: Iturn = await repository.save(turn);
        return newTurn;
    }catch(error){
        console.log(`Error Service (save) Turn: ${JSON.stringify(turn)}`);
        throw new Error(error);
    }
}

export async function removeById(id:number) {
    try{
        await repository.removeById(id);
    }catch(error){
        console.log(`Error Service (removeById) Turn: {Id: ${id}}`);
        throw new Error(error);
    }
}