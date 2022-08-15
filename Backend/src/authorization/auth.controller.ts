"use strict";
import * as express from "express";
import { pool } from "../server/database"

import {IUser} from "../user/user.model";
import * as userService from "../user/user.service"

export async function signUp(request: express.Request, response: express.Response) {
    const user: IUser = request.body;
    try{
        const newUser: IUser = await userService.save(user);
        response.status(201).json(newUser);
    }catch(error){
        console.log(error);
        console.log(`Error Controller (signUp) Auth: ${JSON.stringify(user)}`);
        response.status(404).json(`Error no se pudo dar de alta al usuario ${JSON.stringify(user)}`);
    }
}

export async function signIn(request: express.Request, response: express.Response) {
    console.log(request.body);
    response.json("signin");
}