"use strict";
import * as express from "express";

import { IUser } from "./user.model"
import * as repository from "./user.repository"; 


export async function findAll(request: express.Request, response: express.Response) {
    try{
        const users: IUser[] = await repository.findAll();
        response.status(200).json(users);
    }catch(error){
        console.log(error);
        console.log(`Error Service (findAll) User`);
        response.status(404).json(`Error no se pududieron encontrar los usuarios`);
    }
}

export async function findById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        const user: IUser = await repository.findById(id);
        response.status(200).json(user);
    }catch(error){
        console.log(error);
        console.log(`Error Service (findById) User: { Id: ${id}}`);
        response.status(404).json(`Error no se pudo encontrar el usuario ${id}`);
    }
}

export async function save(request: express.Request, response: express.Response) {
    const user: IUser = request.body;
    try{
        const newUser: IUser = await repository.save(user);
        response.status(201).json(newUser);
    }catch(error){
        console.log(error);
        console.log(`Error Service (save) User: ${user}`);
        response.status(404).json(`Error no se pudo dar de alta al usuario ${JSON.stringify(user)}`);
    }
}


export async function updateById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    const user: IUser = request.body;
    try{
        const userUpdate: IUser = await repository.updateById(id, user);
        response.status(200).json(userUpdate);
    }catch(error){
        console.log(error);
        console.log(`Error Service (updateById) User: ${JSON.stringify(user)} , Id: ${id}`);
        response.status(404).json(`Error no se pudo actualizar el usuario ${id}`);
    }
}

export async function removeById(request: express.Request, response: express.Response) {
    const id: number = parseInt(request.params.id);
    try{
        await repository.removeById(id);
        response.status(204).json(`Usuario ${id} Eliminado`);
    }catch(error){
        console.log(error);
        console.log(`Error Service (updateById) User: {Id: ${id}}`);
        response.status(404).json(`Error no se pudo eliminar el usuario ${id}`);
    }
}


export async function addRolToUser(request: express.Request, response: express.Response) {
    const idUser: number = parseInt(request.params.idUser);
    const { idRol } = request.body;
    try{
        await repository.addRolToUser(idUser, idRol);
        response.status(201).json(`Usuario ${idUser} posee el Rol ${idRol}`);
    }catch(error){
        console.log(error);
        console.log(`Error Service (addRolToUser) User: {Id: ${idUser}}; Rol: {Id: ${idRol}}`);
        response.status(404).json(`Error no se pudo agregar el rol ${idRol} al usuario ${idUser}`);
    }
}

export async function removeRolToUser(request: express.Request, response: express.Response) {
    const idUser: number = parseInt(request.params.idUser);
    const { idRol } = request.body;
    try{
        await repository.removeRolToUser(idUser, idRol);
        response.status(204).json(`Rol ${idRol} eliminado del usuario ${idUser}`);
    }catch(error){
        console.log(error);
        console.log(`Error Service (removeRolToUser) User: {Id: ${idUser}}; Rol: {Id: ${idRol}}`);
        response.status(404).json(`Error no se pudo remover el rol ${idRol} al usuario ${idUser}`);
    }
}