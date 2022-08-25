"use strict";
import * as express from "express";

import { IRol } from "./rol.model"
import * as service from "./rol.service"; 


export async function findAll(request: express.Request, response: express.Response) {
    try{
        const rols: IRol[] = await service.findAll();
        response.status(200).json(rols);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findAll) Rol`);
        response.status(404).json(`Error no se pududieron encontrar los roles`);
    }
}

export async function findById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        const rol: IRol = await service.findById(id);
        response.status(200).json(rol);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (findById) Rol: { Id: ${id}}`);
        response.status(404).json(`Error no se pudo encontrar el rol ${id}`);
    }
}

export async function save(request: express.Request, response: express.Response) {
    const rol: IRol = request.body;
    try{
        const newRol: IRol = await service.save(rol);
        response.status(201).json(newRol);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (save) Rol: ${JSON.stringify(rol)}`);
        response.status(404).json(`Error no se pudo dar de alta al rol ${JSON.stringify(rol)}`);
    }
}


export async function removeById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        await service.removeById(id);
        response.status(204).json(`Rol ${id} Eliminado`);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (updateById) Rol: {Id: ${id}}`);
        response.status(404).json(`Error no se pudo eliminar el rol ${id}`);
    }
}