"use strict";

import { IUser } from "../../user/user.model";
import { IStateTurn } from "../stateTurn/stateTurn.model";
import { Iturn } from "./turn.model"

import * as repository from "./turn.repository"; 

import * as serviceStateTurn from "../stateTurn/stateTurn.service";


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


export async function findByDateSchedule(idSchedule: number, date:Date): Promise<Iturn[]> {
    try{
        const turns: Iturn[] = await repository.findByDateSchedule(idSchedule, date);
        return turns;
    }catch(error){
        console.log(`Error Service (findByDateSchedule) Turn: { IdSchedule: ${idSchedule}, Date: ${date} }`);
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

export async function takeTurn( idTurn: number, user: IUser) {
    try{
        const turn: Iturn = await findById(idTurn);
        const state: IStateTurn = await serviceStateTurn.findById("SOLC");

        await repository.addUserTurn(turn, user);
        await updateStateTurn(idTurn, state);
    }catch(error){
        console.log(`Error Service (takeTurn) Turn: { Id: ${idTurn}}; User: ${JSON.stringify(user)}`);
        throw new Error(error);
    }
}

export async function cancelTurn( idTurn: number) {
    try{
        const turn: Iturn = await findById(idTurn);
        const state: IStateTurn = await serviceStateTurn.findById("DISP");

        await repository.removeUserTurn(turn);
        await updateStateTurn(idTurn, state);
    }catch(error){
        console.log(`Error Service (cancelTurn) Turn: { Id: ${idTurn}}`);
        throw new Error(error);
    }
}

export async function updateStateTurn( idTurn: number, state: IStateTurn) {
    try{
        const turn: Iturn = await findById(idTurn);
        await repository.updateStateTurn(turn, state);
    }catch(error){
        console.log(`Error Service (removeById) Turn: { Id: ${idTurn}}; State_Turn: ${JSON.stringify(state)}`);
        throw new Error(error);
    }
}