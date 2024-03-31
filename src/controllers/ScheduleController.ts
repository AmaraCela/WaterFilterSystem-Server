import { Request, Response } from "express";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { AgentScheduleRepository } from "../repos/AgentScheduleRepository";

export async function getAllSchedules(req: Request, res: Response) {
    const agentScheduleRepository = new AgentScheduleRepository(db);
    try {
        const allSchedules = await agentScheduleRepository.getAll();
        res.status(201).json(allSchedules);
    }
    catch(error) {
        handleException(res, error);
    }
}

export async function addSchedule(req: Request, res: Response) {

}