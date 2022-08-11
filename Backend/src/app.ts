"use strict";

import * as env from "./server/environment";
import { Config } from "./server/environment";
import * as express from "./server/express";

const version = 'V0';

// Variables de entorno
const conf: Config = env.getConfig(process.env);

// Se configura e inicia express
const app = express.init(conf);

app.listen(conf.port, () => {
    console.log(`Turn ${version} iniciado`);
    console.log(`http://localhost:${conf.port}/`);
});

module.exports = app;
