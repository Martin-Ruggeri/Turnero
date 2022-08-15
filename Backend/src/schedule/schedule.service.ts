"use strict";

import { ISchedule } from "./schedule.model"
import * as repository from "./schedule.repository"; 


export async function findAll(): Promise<ISchedule[]>{
    try{
        const schedule: ISchedule[] = await repository.findAll();
        return schedule;
    }catch(error){
        console.log(`Error Service (findAll) Schedule`);
        throw new Error(error);
    }
}

export async function findById(id: number): Promise<ISchedule> {
    try{
        const schedule: ISchedule = await repository.findById(id);
        return schedule;
    }catch(error){
        console.log(`Error Service (findById) Schedule: { Id: ${id}}`);
        throw new Error(error);
    }
}

export async function findByName(name: string): Promise<ISchedule> {
    try{
        const schedule: ISchedule = await repository.findByName(name);
        return schedule;
    }catch(error){
        console.log(`Error Service (findByName) Schedule: { Name: ${name}}`);
        throw new Error(error);
    }
}

export async function save(schedule: ISchedule): Promise<ISchedule> {
    try{
        const newSchedule: ISchedule = await repository.save(schedule);
        return newSchedule;
    }catch(error){
        console.log(`Error Service (save) Schedule: ${JSON.stringify(schedule)}`);
        throw new Error(error);
    }
}

export async function updateById(id:number, schedule: ISchedule): Promise<ISchedule> {
    try{
        const scheduleUpdate: ISchedule = await repository.updateById(id, schedule);
        return scheduleUpdate;
    }catch(error){
        console.log(`Error Service (updateById) Schedule: ${JSON.stringify(schedule)} , Id: ${id}`);
        throw new Error(error);
    }
}


export async function removeById(id:number) {
    try{
        await repository.removeById(id);
    }catch(error){
        console.log(`Error Service (removeById) Schedule: {Id: ${id}}`);
        throw new Error(error);
    }
}