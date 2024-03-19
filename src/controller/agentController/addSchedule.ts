import { Request, Response } from "express";
import { AgentSchedule } from "../../models/AgentSchedule";
import { AgentScheduleRepository } from "../../repos/AgentScheduleRepository";
const db = require('../../sequelize/models');

export async function addSchedule(req: Request, res: Response) {
    console.log(req.body);
    const { agent_id, from, to } = req.body;
    const agentScheduleRepository = new AgentScheduleRepository(db);
    const agentSchedule = new AgentSchedule('Monday', new Date(), new Date());

    try {
        await agentScheduleRepository.save(agentSchedule);
        res.status(201).json({successfulMessage: 'Schedule added successfully'});
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}