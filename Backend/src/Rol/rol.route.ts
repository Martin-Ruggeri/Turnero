"use strict";
import * as express from "express";
import { authAdmin } from "../token/token.controller";

import {findAll, findById, save, removeById} from "./rol.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a rol
    app
    .route("/api/rol")
    .get(authAdmin, findAll)
    .post(authAdmin, save);
  
    app
    .route("/api/rol/:id")
    .get(authAdmin, findById)
    .delete(authAdmin, removeById);
}