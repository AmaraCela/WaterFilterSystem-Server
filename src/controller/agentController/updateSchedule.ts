import { Request, Response } from "express";

export function updateSchedule(req: Request, res: Response) {
    const { agentId, scheduleId, from, to } = req.body;
    try {
        // const response = Schedule.update();
        res.status(200).json({successfulMessage: 'Schedule updated successfully'});
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}