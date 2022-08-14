"use strict";

import * as express from "express";
import {signIn, signUp} from "./auth.service";

export function initModule(app: express.Express) {
    // Rutas de acceso a user
    app
    .route("/api/signup")
    .post(signUp);
  
    app
    .route("/api/signin")
    .post(signIn);
}