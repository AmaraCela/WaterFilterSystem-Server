import { Request, Response } from "express";

import db from "../sequelize/models";

import { handleException } from "./utils/ErrorHandler";
import { ScheduleMapper } from "../mappers/ScheduleMapper";
import { AgentScheduleRepository } from "../repos/AgentScheduleRepository";
import { SalesAgentRepository } from "../repos/SalesAgentRepository";
import { AgentSchedule } from "../models/AgentSchedule";

const { param, body } = require('express-validator');

export const scheduleIdValidator = [
    param('scheduleId').exists().isInt().withMessage("Invalid schedule id")
]

export async function getAllSchedules(req: Request, res: Response) {
    const agentScheduleRepository = new AgentScheduleRepository(db);
    try {
        const schedules = await agentScheduleRepository.getAll();
        res.json(schedules.map(ScheduleMapper.toDTOAll));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function getSchedulesOfAgent(req: Request, res: Response) {
    const { id } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);
    const salesAgentRepository = new SalesAgentRepository(db);

    const idInt = parseInt(id);
    try {
        const user = await salesAgentRepository.findAgentById(idInt);
        if (!user) {
            res.status(404).json({ message: "Sales agent not found" });
            return;
        }
        
        const agentSchedules = await agentScheduleRepository.getByAgentId(idInt);
        res.json(agentSchedules.map(ScheduleMapper.toDTO));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addScheduleToAgent(req: Request, res: Response) {
    const { day, startTime, endTime } = req.body;
    const { id } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);
    const salesAgentRepository = new SalesAgentRepository(db);
    
    const idInt = parseInt(id);
    try {
        const user = await salesAgentRepository.findAgentById(idInt);
        if (!user) {
            res.status(404).json({ message: "Sales agent not found" });
            return;
        }

        let schedule = new AgentSchedule(day, startTime, endTime, idInt);
        schedule.ensureValidSchedule();

        schedule = await agentScheduleRepository.save(schedule);
        res.json(ScheduleMapper.toDTO(schedule));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function updateSchedule(req: Request, res: Response) {
    const { day, startTime, endTime } = req.body;
    const { id, scheduleId } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);

    const idInt = parseInt(id);
    const scheduleIdInt = parseInt(scheduleId);
    try {
        const schedule = await agentScheduleRepository.getByScheduleId(idInt, scheduleIdInt);
        if (!schedule) {
            res.status(404).json({ message: "Schedule not found" });
            return;
        }
        
        schedule.day = new Date(day);
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        schedule.ensureValidSchedule();
        
        await agentScheduleRepository.save(schedule);
        res.json(ScheduleMapper.toDTO(schedule));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteSchedule(req: Request, res: Response) {
    const { id, scheduleId } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);

    const idInt = parseInt(id);
    const scheduleIdInt = parseInt(scheduleId);
    try {
        const schedule = await agentScheduleRepository.getByScheduleId(idInt, scheduleIdInt);
        if (!schedule) {
            res.status(404).json({ message: "Schedule not found" });
            return;
        }
        
        await agentScheduleRepository.delete(schedule);
        res.status(204).send();
    }
    catch (error) {
        handleException(res, error);
    }
}