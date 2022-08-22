import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { IUser, getAll } from "./userService";

import { useErrorHandler } from "../common/utils/errorHandler";

import { DangerLabel } from "../common/components/DangerLabel";

export function User() {
    const [users, setUsers] = useState<IUser[]>([]);

    const errorHandler = useErrorHandler();

    let navigate = useNavigate();

    const loadUsers = async () => {
        try {
            const result = await getAll();
            setUsers(result);
        } catch (error) {
            errorHandler.newErrorGeneric("Error al buscar Usuarios");
        }
    }

    const updateUser = (userId: string) => {
        navigate("/editPet/" + userId);
    }

    const newUser = () => {
        navigate("/editPet");
    }


    useEffect(() => {
        void loadUsers();
    }, []);

    return (
        <div>
            <h2>Mascotas</h2>

            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th> Nombre </th>
                        <th> Apellido </th>
                        <th> Email </th>
                        <th> Roles </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>

                                <td>
                                    {user.roles.map((rol) => {
                                        return (
                                            <p>{rol.nameRol}</p>
                                        );
                                    })}
                                </td>

                                <td className="text">
                                    <img
                                        src="/assets/edit.png"
                                        alt=""
                                        onClick={() => updateUser(user.id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            <DangerLabel message={errorHandler.errorMessage} />


                <button className="btn btn-primary btn-lg m-3" onClick={newUser}>Nuevo Usuario</button>

        </div>
    );
}
