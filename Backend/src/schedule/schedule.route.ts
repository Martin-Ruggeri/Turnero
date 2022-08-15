"use strict";
import * as express from "express";
import { onlyLoggedIn , authAdmin } from "../token/token.controller";

import {findAll, findById, save, updateById, removeById} from "./schedule.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a schedule
    app
    .route("/api/schedule")
    .get(onlyLoggedIn, findAll)
    .post(authAdmin, save);
  
    app
    .route("/api/schedule/:id")
    .get(onlyLoggedIn, findById)
    .put(authAdmin, updateById)
    .delete(authAdmin, removeById);
}