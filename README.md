# Turnero

La aplicación se modelo para poder solicitar turnos en una peluquería.


---

<br>

## Levantar Proyecto

### Requisitos para levantar el proyecto
* Tener instalado Node
* Tener instalado React
* Motor de Base de Datos PostgreSQL


### Levantar Backend

Se deben seguir los siguientes pasos:

1. Crear Base de datos 'turn'
 * Primero crear Base de Datos 'turn', para ello ejecutar `CREATE DATABASE turn;`
 * Luego ir a la carpeta `Turn-Backend\database` y ejecutar el script database.sql
2. Abrir una consola y acceder a la carpeta `Turn-Backend`
3. Ejecutar `npm install`
4. Ejecutar `npm start`

Listo, Backend levantado.!!


### Levantar Frontend

Se deben seguir los siguientes pasos:

1. Abrir una consola y acceder a la carpeta `Turn-Frontend`
2. Ejecutar `npm install`
3. Ejecutar `npm start`

Listo, Frontend levantado.!!

---

## Primeros Pasos

Una vez levantado el Backend y Frontend, se deben seguir un conjunto de pasos para poder utilizar la aplicación.

1. Acceder a la url `http://localhost:3001/singUp` y registrarse.
2. Ejecutar por Base de Datos un script para asignarse el rol Administrador, para ello ejecutar el siguiente script, reemplazando MAIL_DADO_DE_ALTA_PASO_1 por el mail correspondiente:

```
INSERT INTO USERS_ROL (USER_ID, ROL_ID) VALUES ((SELECT USER_ID FROM USERS WHERE EMAIL = 'MAIL_DADO_DE_ALTA_PASO_1'), (SELECT ROL_ID FROM ROL WHERE ROLNAME  = 'admin'));
```

3. Ingresar a la aplicacion `http://localhost:3001/`, loguearse y crear una agenda, para ello seleccionar en el menu Crear Agenda (Solo para Administrador)

Listo..!! Ahora cualqueir usuario nuevo podra solicitar un turno en la agenda.
