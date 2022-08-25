"use strict";
import * as express from "express";
import { onlyLoggedIn , authAdmin , authCustomer} from "../token/token.controller";

import {findAll, findById, findCurrentUser, save, updateById, removeById, addRolToUser, removeRolToUser} from "./user.controller";


export function initModule(app: express.Express) {
    // Rutas de acceso a user
    app
    .route("/api/user")
    .get(onlyLoggedIn, findAll)
    .post(authAdmin, save);

    app
    .route("/api/user/current")
    .get(onlyLoggedIn, findCurrentUser);

    app
    .route("/api/user/:id")
    .get(onlyLoggedIn, findById)
    .put(onlyLoggedIn, updateById)
    .delete(authCustomer, removeById);

    app
    .route("/api/user/:idUser/addRol")
    .post(authAdmin, addRolToUser);

    app
    .route("/api/user/:idUser/removeRol")
    .post(authAdmin, removeRolToUser);
}