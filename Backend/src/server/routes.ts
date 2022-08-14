"use strict";

import * as express from "express";

import * as authorization from "../authorization/auth.routes";
import * as user from "../user/user.route";
import * as rol from "../Rol/rol.route";

/**
  * Desacoplamos las rutas
  */

export function initModules(app: express.Express) {
    authorization.initModule(app);
    user.initModule(app);
    rol.initModule(app);
}

