import { Request, Response } from "express";
import { MeetingRepository } from "../repos/MeetingRepository";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";

export async function getMeetings(req: Request, res: Response) {
    const { agentid } = req.query;
    if(agentid) {
        getMeetingsOfAgent(req, res);
        return;
    }
    
    const meetingRepository = new MeetingRepository(db);
    try {
        const meetings = await meetingRepository.getAll();
        res.status(200).json(meetings);
    }
    catch (error) {
        handleException(res, error);
    }
}

async function getMeetingsOfAgent(req: Request, res: Response) {

}