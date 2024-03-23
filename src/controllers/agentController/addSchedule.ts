import { Request, Response } from "express";
import { AgentSchedule } from "../../models/AgentSchedule";
import { AgentScheduleRepository } from "../../repos/AgentScheduleRepository";
const db = require('../../sequelize/models');

export async function addSchedule(req: Request, res: Response) {
    const { agent_id, from, to } = req.body;
    const fromTime = new Date(from);
    const toTime = new Date(to);
    const dayOfTheWeek = 'Monday';
    const agentScheduleRepository = new AgentScheduleRepository(db);
    const agentSchedule = new AgentSchedule(dayOfTheWeek, fromTime, toTime, agent_id);

    try {
        await agentScheduleRepository.save(agentSchedule);
        res.status(201).json({ successfulMessage: 'Schedule added successfully' });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error });
    }
}