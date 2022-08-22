import React from "react"

import { MenuAdmin } from "./menuAdmin";
import { MenuMain } from "./menuMain";
import { MenuLogin } from "./menuLogin";

import "./menu.css"

export const Menu = () => {

    const user = { name: "Martin", roles: ["ad"] };
    let menu = <MenuLogin />;

    if (user) {
        if (user.roles.includes("admin")) menu = <MenuAdmin />;
        else if (user.roles.includes("customer")) menu = <MenuMain />;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            {menu}
        </nav>
    )
}
