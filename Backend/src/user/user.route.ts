"use strict";
import * as express from "express";

import {findAll, findById, save, updateById, removeById, addRolToUser, removeRolToUser} from "./user.service";


export function initModule(app: express.Express) {
    // Rutas de acceso a user
    app
    .route("/api/user")
    .get(findAll)
    .post(save);
  
    app
    .route("/api/user/:id")
    .get(findById)
    .put(updateById)
    .delete(removeById);

    app
    .route("/api/user/:idUser/addRol")
    .post(addRolToUser);

    app
    .route("/api/user/:idUser/removeRol")
    .post(removeRolToUser);
}