import { Pool } from "pg";

import * as  env  from "./environment";
import { ConfigBD } from "./environment";


// Variables de entorno
const conf: ConfigBD = env.getConfigBD(process.env);


// Establecer conexion con Postgress
export const pool = new Pool({
    user: conf.db_user,
    host: conf.db_host,
    database: conf.db_database,
    password: conf.db_password,
    port: conf.db_port,
});