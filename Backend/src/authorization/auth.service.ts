"use strict";
import * as express from "express";
import { pool } from "../server/database"

export async function signUp(request: express.Request, response: express.Response) {
    response.json("signin");
}

export async function signIn(request: express.Request, response: express.Response) {
    console.log(request.body);
    response.json("signin");
}