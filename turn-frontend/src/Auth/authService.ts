import axios from "axios";
import { environment } from "../app/environment/environment";

import { updateSessionUser, cleanupSessionUser } from "./userStore";
import { IUser } from "../user/userService";


axios.defaults.headers.common["Content-Type"] = "application/json";

export interface ILogin {
    email: string;
    password: string;
}

export interface IToken {
    token: string;
}

export interface ISignUp {
    name: string;
    lastname: string;
    email: string;
    password: string;
}


export async function login(payload: ILogin): Promise<IToken> {
    try {
        const res: IToken = (await axios.post(environment.backendUrl + "/api/signin", payload)).data as IToken;
        setCurrentToken(res.token);
        void reloadCurrentUser().then();
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}


export async function logout() {
    localStorage.removeItem("token");
    axios.defaults.headers.common.Authorization = "";
    cleanupSessionUser();
}


export async function singUp(payload: ISignUp): Promise<IToken> {
    try {
        const res = (await axios.post(environment.backendUrl + "/api/signup", payload)).data as IToken;
        setCurrentToken(res.token);
        void reloadCurrentUser().then();
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}


function setCurrentToken(token: string) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = token;
}

export function getCurrentToken(): string | undefined {
    const result = localStorage.getItem("token");
    return result ? result : undefined;
}


async function reloadCurrentUser(): Promise<IUser> {
    try {
        const res = (await axios.get(environment.backendUrl + "/api/user/current")).data as IUser;
        updateSessionUser(res);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}