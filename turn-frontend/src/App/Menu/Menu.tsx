import React from "react"

import { MenuAdmin } from "./menuAdmin";
import { MenuMain } from "./menuMain";
import { MenuLogin } from "./menuLogin";

import { useSessionUser } from "../../auth/userStore"

import "./menu.css"

export const Menu = () => {

    const user = useSessionUser();

    let menu = <MenuLogin />;

    console.log(`Menu 1: User: ${user}`);

    if (user) {

        console.log("Menu 2");
        /*
        user.roles.forEach((rol) => {
            if(rol.nameRol === "admin") {
                menu = <MenuAdmin />;
                return;
            }
        });
        */
        menu = <MenuMain />;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            {menu}
        </nav>
    )
}
