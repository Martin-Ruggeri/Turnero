"use strict";
import * as express from "express";
import { onlyLoggedIn , authAdmin } from "../../token/token.controller";

import {findAll, findById, save, removeById} from "./stateTurn.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a schedule
    app
    .route("/api/stateTurn")
    .get(onlyLoggedIn, findAll)
    .post(authAdmin, save);
  
    app
    .route("/api/stateTurn/:code")
    .get(onlyLoggedIn, findById)
    .delete(authAdmin, removeById);
}