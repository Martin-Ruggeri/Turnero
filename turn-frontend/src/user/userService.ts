import axios from "axios"
import { environment } from "../app/environment/environment"


interface IRol{
    id: string;
    nameRol: string;
}

export interface IUser {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    roles: IRol[];
}

const url_users = "/api/user/";

export async function getAll(): Promise<IUser[]> {
    try {
        const res = (await axios.get(environment.backendUrl + url_users)).data as IUser[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getId(id: string): Promise<IUser> {
    try {
        const res = (await axios.get(environment.backendUrl + url_users + id)).data as IUser
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function save(payload: IUser): Promise<IUser> {
    try {
        const res = (await axios.post(environment.backendUrl + url_users, payload)).data as IUser
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function update(payload: IUser): Promise<IUser> {
    try {
        const res = (await axios.post(environment.backendUrl + url_users + payload.id, payload)).data as IUser
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await axios.delete(environment.backendUrl + url_users + id)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}
