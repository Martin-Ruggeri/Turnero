import React from "react"

import { MenuAdmin } from "./MenuAdmin";
import { MenuMain } from "./MenuMain";
import { MenuLogin } from "./MenuLogin";

import "./Menu.css"

export const Menu = () => {

    const user = { name: "Martin", roles: ["admin", "customer"] };
    let menu = <MenuLogin />;

    if (user) {
        if (user.roles.includes("admin")) menu = <MenuAdmin />;
        else menu = <MenuMain />;

    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            {menu}
        </nav>
    )
}
