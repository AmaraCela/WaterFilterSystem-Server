import { Request, Response } from "express";
import { CallRepository } from "../repos/CallRepository";
import { UserRepository } from "../repos/UserRepository";
import { Call } from "../models/Call";

import db from "../sequelize/models";

import { handleException } from "./utils/ErrorHandler";
import { ScheduleMapper } from "../mappers/ScheduleMapper";
import { AgentScheduleRepository } from "../repos/AgentScheduleRepository";
import { UserRole } from "../enums/UserRole";

const { param, body } = require('express-validator');

export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid id")
]

export const callValidator = [
    body('day').exists().withMessage("day field required").bail()
        .isISO8601().withMessage("day field must be a valid date in ISO8601 format"),
    body('startTime').exists().withMessage("startTime field required"),
    body('endTime').exists().withMessage("endTime field required")
]

export async function getAllSchedules(req: Request, res: Response) {
    const agentScheduleRepository = new AgentScheduleRepository(db);
    try {
        const schedules = await agentScheduleRepository.getAll();
        res.json(schedules.map(ScheduleMapper.toDTO));
    }
    catch(error) {
        handleException(res, error);
    }
}

export async function getSchedulesOfAgent(req: Request, res: Response) {
    const { id } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);
    const salesAgentRepository = new UserRepository(db);

    const idInt = parseInt(id);
    try {
        const user = await salesAgentRepository.findUserById(idInt);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        if (user.role !== UserRole.SALES_AGENT) {
            res.status(400).json({ message: "User is not a sales agent" });
            return;
        }
        
        const agentSchedules = await agentScheduleRepository.getByAgentId(idInt);
        res.json(agentSchedules.map(ScheduleMapper.toDTO));
    }
    catch(error) {
        handleException(res, error);
    }
}

export async function addScheduleToAgent(req: Request, res: Response) {
    const { day, startTime, endTime } = req.body;
    const { id } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);
    const salesAgentRepository = new UserRepository(db);
    
    const idInt = parseInt(id);
    try {
        const user = await salesAgentRepository.findUserById(idInt);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        if (user.role !== UserRole.SALES_AGENT) {
            res.status(400).json({ message: "User is not a sales agent" });
            return;
        }
        
        const schedule = ScheduleMapper.toDomain({ day, startTime, endTime, salesAgent: idInt });
        const savedSchedule = await agentScheduleRepository.save(schedule);
        res.json(ScheduleMapper.toDTO(savedSchedule));
    }
    catch(error) {
        handleException(res, error);
    }
}

export async function updateSchedule(req: Request, res: Response) {
    const { day, startTime, endTime } = req.body;
    const { id } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);

    const idInt = parseInt(id);
    try {
        const schedule = await agentScheduleRepository.getByScheduleId(idInt);
        if (!schedule) {
            res.status(404).json({ message: "Schedule not found" });
            return;
        }
        
        schedule.day = new Date(day);
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        
        await agentScheduleRepository.save(schedule);
        res.json(ScheduleMapper.toDTO(schedule));
    }
    catch(error) {
        handleException(res, error);
    }
}

export async function deleteSchedule(req: Request, res: Response) {
    const { id } = req.params;
    const agentScheduleRepository = new AgentScheduleRepository(db);

    const idInt = parseInt(id);
    try {
        const schedule = await agentScheduleRepository.getByScheduleId(idInt);
        if (!schedule) {
            res.status(404).json({ message: "Schedule not found" });
            return;
        }
        
        await agentScheduleRepository.delete(schedule);
        res.status(204).send();
    }
    catch(error) {
        handleException(res, error);
    }
}