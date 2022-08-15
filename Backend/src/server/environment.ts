"use strict";

import * as dotenv from "dotenv";

let config: ConfigExpress;
let configBD: ConfigBD;
let configJWT: ConfigJWT;

export interface ConfigExpress {
  port: string;
  logLevel: string; // 'debug' | 'verbose' | 'info' | 'warn' | 'error';
}

export interface ConfigBD {
  db_user: string;
  db_password: string;
  db_host: string;
  db_port: number;
  db_database: string;
}

export interface ConfigJWT {
  jwt_secret: string;
}

/*
Todas las configuraciones del servidor se encuentran en este modulo, si se quiere
acceder desde cualquier parte del sistema, se deben acceder llamando a este metodo.
*/
export function getConfigExpress(environment: any): ConfigExpress {
  if (!config) {
    dotenv.config({ path: ".env" });

    config = {
      port: process.env.SERVER_PORT || "3000",
      logLevel: process.env.LOG_LEVEL || "debug"
    };
  }

  return config;
}


export function getConfigBD(environment: any): ConfigBD {
  if (!configBD) {
    dotenv.config({ path: ".env" });

    configBD = {
      db_user: process.env.DB_USER || "postgres",
      db_password: process.env.DB_PASSWORD || "admin",
      db_host: process.env.DB_HOST || "localhost",
      db_port: parseInt(process.env.DB_PORT) || 5432,
      db_database: process.env.DB_DATABASE || "turn",

    };
  }

  return configBD;
}


export function getConfigJWT(environment: any): ConfigJWT {
  if (!configJWT) {
    dotenv.config({ path: ".env" });

    configJWT = {
      jwt_secret: process.env.JWT_SECRET || "ZGQ4M2ExNTZhN2VlNWI4ZjhkZGE0ZTkzY2I3YTVmZjNiY2U0MGRjNTU0MWU0aLKMsdasdSAasdZmNDliODFmMzAwYmRkNjhiZWMxODNhZmQwNmIxYjk4ZWMxZTFmZWQ1M2JlYjgyNzhkZWZmYjM1ODVjZjk3YzFkNDk1MmNiOWM",
    };
  }

  return configJWT;
}