"use strict";
import * as express from "express";

import { IStateTurn } from "./stateTurn.model"
import * as service from "./stateTurn.service"; 


export async function findAll(request: express.Request, response: express.Response) {
    try{
        const stateTurn: IStateTurn[] = await service.findAll();
        response.status(200).json(stateTurn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findAll) State_Turn`);
        response.status(404).json(`Error no se pududieron encontrar los estados`);
    }
}

export async function findById(request: express.Request, response: express.Response) {
    const code: string = request.params.code;
    try{
        const stateTurn: IStateTurn = await service.findById(code);
        response.status(200).json(stateTurn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findById) State_Turn: { State_Turn_Code: ${code}}`);
        response.status(404).json(`Error no se pudo encontrar el estado ${code}`);
    }
}


export async function save(request: express.Request, response: express.Response) {
    const stateTurn: IStateTurn = request.body;
    try{
        const newStateTurn: IStateTurn = await service.save(stateTurn);
        response.status(201).json(newStateTurn);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (save) State_Turn: ${JSON.stringify(stateTurn)}`);
        response.status(404).json(`Error no se pudo dar de alta el estado ${JSON.stringify(stateTurn)}`);
    }
}

export async function removeById(request: express.Request, response: express.Response) {
    const code: string = request.params.code;
    try{
        await service.removeById(code);
        response.status(204).json(`Estado ${code} Eliminado`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (removeById) State_Turn: { State_Turn_Code: ${code}}`);
        response.status(404).json(`Error no se pudo eliminar el estado ${code}`);
    }
}