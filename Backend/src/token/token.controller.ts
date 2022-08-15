"use strict";
import * as express from "express";

import * as service from "./token.service";

import { IUser } from "../user/user.model";
import * as serviceUser from "../user/user.service"

import { IRol } from "../rol/rol.model";
import * as serviceRol from "../rol/rol.service"
import { IDecode } from "./token.model";


export async function onlyLoggedIn(request: express.Request, response: express.Response, next: express.NextFunction) {
    return validateToken(request, response, next, "loggedIn");
}
export async function authAdmin(request: express.Request, response: express.Response, next: express.NextFunction) {
    return validateToken(request, response, next, "admin");
}
export async function authCustomer(request: express.Request, response: express.Response, next: express.NextFunction) {
    return validateToken(request, response, next, "customer");
}


async function validateToken (request: express.Request, response: express.Response, next: express.NextFunction, rolName: string){
    
    // Valida que exista token
    const token: string = request.headers.authorization;
    if(!token) return response.status(401).json({message: `Unauthorized`});

    try{
        // Decodifica token
        const decode: IDecode = JSON.parse(service.decodeToken(token));

        // Valida que exista el usuario
        const user: IUser = await serviceUser.findById(decode.idUser);
        if(!user) return response.status(401).json({message: `Unauthorized`});

        // Si no requiere de ningun rol => Esta autorizado
        if (rolName == "loggedIn") return next();

        // Valida que el usuario tenga el rol necesario
        const rols: IRol[] = await serviceRol.findRolsByUser(user);
        if(!rols) return response.status(403).json({message: `insufficient permission`});

        for (const rol of rols) {
            if(rol.rolname == rolName) return next();
        }
    }catch(error){
        console.log(error);
    }
    return response.status(403).json({message: `insufficient permission`});
}