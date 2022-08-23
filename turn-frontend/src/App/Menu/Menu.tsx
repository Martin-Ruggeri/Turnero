import React from "react"

import { MenuAdmin } from "./menuAdmin";
import { MenuMain } from "./menuMain";
import { MenuLogin } from "./menuLogin";

import { useSessionUser } from "../../auth/userStore"

import "./menu.css"
import { IUser } from "../../user/userService";

export const Menu = () => {

    const user = useSessionUser();

    const getMenu = (user: IUser | undefined): JSX.Element => {
        if (user) {
            for (const rol of user.roles) {
                if(rol.rolname === "admin") {
                    return <MenuAdmin />;
                }
            }
            return <MenuMain />;
        }else{
            return <MenuLogin />;
        }

    }

    let menu: JSX.Element = getMenu(user);

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            {menu}
        </nav>
    )
}
