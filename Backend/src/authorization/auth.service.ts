"use strict";
import * as bcrypt from "bcryptjs";


export async function encryptPassword (password: string){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function comparePassword (passwordBD: string, passwordReceived: string){
    return await bcrypt.compare(passwordReceived, passwordBD);
}