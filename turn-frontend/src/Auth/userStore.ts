import { Subject } from "rxjs";
import { IUser } from "../user/userService";
import { useState, useLayoutEffect } from "react";

let currentUser: IUser | undefined;

const userSubject = new Subject<IUser | undefined>();

export function useSessionUser() {
    const [user, setUser] = useState(currentUser);

    useLayoutEffect(() => {
        userSubject.subscribe((newState) => {
            setUser(newState);
        })
    }, []);

    return user;
}

export function updateSessionUser(user: IUser) {
    currentUser = user;
    userSubject.next(currentUser);
}

export function cleanupSessionUser() {
    currentUser = undefined;
    userSubject.next(currentUser);
}
