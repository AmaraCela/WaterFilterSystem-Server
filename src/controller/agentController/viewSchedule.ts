import { Request, Response } from "express";

export function viewSchedule(req: Request, res: Response) {
    const { agentId } = req.body;
    try {
        // const response = Schedule.get(agent_id);
        // res.status(201).json({response});
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}