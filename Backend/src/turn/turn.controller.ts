"use strict";
import * as express from "express";

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
        response.status(404).json(`Error no se pudo encontrar el turno ${id}`);
    }
}

export async function findAllBySchedule(request: express.Request, response: express.Response) {
    const idSchedule: number = parseInt(request.params.idSchedule);
    try{
        const turn: Iturn = await service.findAllBySchedule(idSchedule);
        response.status(200).json(turn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findAllBySchedule) Turn: { Id Schedule: ${idSchedule}}`);
        response.status(404).json(`Error no se pududieron encontrar los turnos para la Agenda ${idSchedule}`);
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