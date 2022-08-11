"use strict";

import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as morgan from "morgan";

import { Config } from "./environment";

import * as routes from "./routes";

export function init(appConfig: Config): express.Express {
  const app = express();
  app.set("port", appConfig.port);

  // Si estamos en level debug, log de los request
  if (appConfig.logLevel == "debug") {
    app.use(morgan("dev"));
  }

  // Configuramos el server para que tome los json correctamente
  app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
  app.use(bodyParser.json({ limit: "5mb" }));

  // Configurar express para comprimir contenidos de text en http
  app.use(compression());


  // Iniciamos las rutas del directorio
  app.get("/", (req, res, next) => { res.send(`Bienvenidos`); });
  routes.initModules(app);

  return app;
}
