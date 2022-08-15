"use strict";
import * as express from "express";

import * as service from "./auth.service";

import * as serviceToken from "../token/token.service";

import { IUser } from "../user/user.model";
import * as serviceUser from "../user/user.service"

import { IPayload } from "../token/token.model";


export async function signUp(request: express.Request, response: express.Response) {
    let user: IUser = request.body;
    try{
        const newUser: IUser = await serviceUser.save(user);
        response.status(201).json(newUser);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (signUp) Auth: ${JSON.stringify(user)}`);
        response.status(404).json(`Error no se pudo dar de alta al usuario ${JSON.stringify(user)}`);
    }
}


export async function signIn(request: express.Request, response: express.Response) {
    const body: IUser = request.body;
    try{
        const user: IUser = await serviceUser.findByEmail(body.email);
        if(!user) return response.status(400).json({message: `Usuario no encontrado`});

        const matchPassword = await service.comparePassword(user.password, body.password);
        if(!matchPassword) return response.status(400).json({message: `Contraseña incorrecta`});

        const payload: IPayload = {idUser: user.user_id, expiresIn: 86400 }; // expiresIn: 86400 = 24 horas

        const token = serviceToken.generateToken(payload);

        response.status(200).json({token: token});
    }catch(error){
        console.log(error);
        console.log(`Error Controller (signIn) Auth: ${JSON.stringify(body)}`);
        response.status(404).json(`Usuario o contraseña incorrecta`);
    }
}