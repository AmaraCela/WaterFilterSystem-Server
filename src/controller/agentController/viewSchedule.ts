import { Request, Response } from "express";

export function addSchedule(req: Request, res: Response) {
    const { agent_id } = req.body;
    try {
        // const response = Schedule.get(agent_id);
        // res.status(201).json({response});
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}