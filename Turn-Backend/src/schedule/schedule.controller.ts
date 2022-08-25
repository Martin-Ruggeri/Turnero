"use strict";
import * as express from "express";

import { ISchedule } from "./schedule.model"
import * as service from "./schedule.service"; 


export async function findAll(request: express.Request, response: express.Response) {
    try{
        const schedule: ISchedule[] = await service.findAll();
        response.status(200).json(schedule);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findAll) Schedule`);
        response.status(404).json(`Error no se pududieron encontrar las agendas`);
    }
}

export async function findById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        const schedule: ISchedule = await service.findById(id);
        response.status(200).json(schedule);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findById) Schedule: { Id: ${id}}`);
        response.status(404).json(`Error no se pudo encontrar la agenda ${id}`);
    }
}

export async function save(request: express.Request, response: express.Response) {
    const schedule: ISchedule = request.body;
    try{
        const newSchedule: ISchedule = await service.save(schedule);
        response.status(201).json(newSchedule);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (save) Schedule: ${JSON.stringify(schedule)}`);
        response.status(404).json(`Error no se pudo dar de alta la agenda ${JSON.stringify(schedule)}`);
    }
}

export async function removeById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        await service.removeById(id);
        response.status(204).json(`Agenda ${id} Eliminada`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (removeById) Schedule: {Id: ${id}}`);
        response.status(404).json(`Error no se pudo eliminar la agenda ${id}`);
    }
}