"use strict";
import * as express from "express";
import { onlyLoggedIn , authAdmin } from "../../token/token.controller";

import {findAll, findByDateSchedule, findById, save, removeById, takeTurn, cancelTurn, updateStateTurn} from "./turn.controller";


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
    .route("/api/turn/schedule/:idSchedule/:date")
    .get(onlyLoggedIn, findByDateSchedule)

    app
    .route("/api/turn/:id/user")
    .post(onlyLoggedIn, takeTurn)
    .delete(onlyLoggedIn, cancelTurn)

    app
    .route("/api/turn/:id/state")
    .post(authAdmin, updateStateTurn)
}