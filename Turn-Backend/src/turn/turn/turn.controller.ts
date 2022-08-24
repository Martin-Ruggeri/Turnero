"use strict";
import * as express from "express";
import { IUser } from "../../user/user.model";
import { IStateTurn } from "../stateTurn/stateTurn.model";

import { Iturn } from "./turn.model"
import * as service from "./turn.service"; 


export async function findAll(request: express.Request, response: express.Response) {
    try{
        const turn: Iturn[] = await service.findAll();
        response.status(200).json(turn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findAll) Turn`);
        response.status(404).json(`Error no se pududieron encontrar los turnos`);
    }
}

export async function findById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        const turn: Iturn = await service.findById(id);
        response.status(200).json(turn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findById) Turn: { Id: ${id}}`);
        response.status(404).json(`Error no se pudo encontrar el turno  ${id}`);
    }
}


export async function findAllBySchedule(request: express.Request, response: express.Response) {
    const idSchedule: number = parseInt(request.params.idSchedule);
    try{
        const turns: Iturn[] = await service.findAllBySchedule(idSchedule);
        response.status(200).json(turns);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findAllBySchedule) Turn: { Id Schedule: ${idSchedule}}`);
        response.status(404).json(`Error no se pududieron encontrar los turnos para la Agenda ${idSchedule}`);
    }
}


export async function findByDateSchedule(request: express.Request, response: express.Response) {
    const idSchedule: number = parseInt(request.params.idSchedule);
    const date: Date = new Date (Date.parse(request.params.date));
    try{
        const turns: Iturn[] = await service.findByDateSchedule(idSchedule, date);
        response.status(200).json(turns);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findByDateSchedule) Turn: { IdSchedule: ${idSchedule}, Date: ${date} }`);
        response.status(404).json(`Error no se pududieron encontrar los turnos para la Agenda ${idSchedule} y el dia ${date}`);
    }
}

export async function save(request: express.Request, response: express.Response) {
    const turn: Iturn = request.body;
    try{
        const newTurn: Iturn = await service.save(turn);
        response.status(201).json(newTurn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (save) Turn: ${JSON.stringify(turn)}`);
        response.status(404).json(`Error no se pudo dar de alta el turno ${JSON.stringify(turn)}`);
    }
}

export async function removeById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        await service.removeById(id);
        response.status(204).json(`Turno ${id} Eliminado`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (removeById) Turn: {Id: ${id}}`);
        response.status(404).json(`Error no se pudo eliminar el turno ${id}`);
    }
}

export async function takeTurn(request: express.Request, response: express.Response) {
    const idTurn: number = parseInt(request.params.id);
    const user: IUser = request.body;
    try{
        await service.takeTurn(idTurn, user);
        response.status(200).json(`Turno ${idTurn} Solicitado por el usuario ${user.user_id}`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (takeTurn) Turn: { Id: ${idTurn}}; User: ${JSON.stringify(user)}`);
        response.status(404).json(`Error no se pudo Solicitar el turno ${idTurn} para el usuario ${user.user_id}`);
    }
}

export async function cancelTurn(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        await service.cancelTurn(id);
        response.status(200).json(`Turno ${id} Cancelado, se paso a estado disponible`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (cancelTurn) Turn: {Id: ${id}}`);
        response.status(404).json(`Error no se pudo cancelar el turno ${id}`);
    }
}

export async function updateStateTurn(request: express.Request, response: express.Response) {
    const idTurn: number = parseInt(request.params.id);
    const state: IStateTurn = request.body;
    try{
        await service.updateStateTurn(idTurn, state);
        response.status(200).json(`El Turno ${idTurn} actualizo su estado a ${state.state_turn_code}`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (updateStateTurn) Turn: { Id: ${idTurn}}; State_Turn: ${JSON.stringify(state)}`);
        response.status(404).json(`Error no se pudo actualizar el estado del turno ${idTurn}`);
    }
}