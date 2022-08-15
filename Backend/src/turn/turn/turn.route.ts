"use strict";
import * as express from "express";
import { onlyLoggedIn , authAdmin } from "../../token/token.controller";

import {findAll, findAllBySchedule, findById, save, removeById} from "./turn.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a schedule
    app
    .route("/api/turn")
    .get(onlyLoggedIn, findAll)
    .post(authAdmin, save);
  
    app
    .route("/api/turn/:id")
    .get(onlyLoggedIn, findById)
    .delete(authAdmin, removeById);

    app
    .route("/api/turn/schedule/:idSchedule")
    .get(onlyLoggedIn, findAllBySchedule)
}