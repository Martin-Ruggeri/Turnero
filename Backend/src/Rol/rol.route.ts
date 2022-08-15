"use strict";
import * as express from "express";

import {findAll, findById, save, removeById} from "./rol.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a rol
    app
    .route("/api/rol")
    .get(findAll)
    .post(save);
  
    app
    .route("/api/rol/:id")
    .get(findById)
    .delete(removeById);
}