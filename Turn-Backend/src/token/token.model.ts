"use strict";

export interface IPayload {
    idUser: number; 
    expiresIn: number;
}

export interface IDecode {
    idUser: number; 
    iat: number;
    exp: number;
}
