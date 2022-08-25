"use strict";
import * as jwt from "jsonwebtoken";

import * as  env  from "../server/environment";
import { ConfigJWT } from "../server/environment";

import { IPayload } from "./token.model";

// Variables de entorno
const conf: ConfigJWT = env.getConfigJWT(process.env);

export function generateToken(payload: IPayload): string {
    return jwt.sign({idUser: payload.idUser}, conf.jwt_secret, {expiresIn: payload.expiresIn } );
}


export function decodeToken(token: string){
    return JSON.stringify(jwt.verify(token, conf.jwt_secret));
}