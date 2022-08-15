"use strict";
import * as express from "express";
import { onlyLoggedIn , authAdmin } from "../token/token.controller";

import {findAll, findAllBySchedule, findById, save, removeById} from "./turn.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a schedule
    app
    .route("/api/turn")
    .get(findAll)
    .post(save);
  
    app
    .route("/api/turn/:id")
    .get(findById)
    .delete(removeById);

    app
    .route("/api/turn/schedule/:idSchedule")
    .get(findAllBySchedule)
}