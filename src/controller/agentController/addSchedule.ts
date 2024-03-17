import { Request, Response } from "express";

export function addSchedule(req: Request, res: Response) {
    const { agent_id, from, to } = req.body;
    try {
        // const response = Schedule.add();
        res.status(201).json({successfulMessage: 'Schedule added successfully'});
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}