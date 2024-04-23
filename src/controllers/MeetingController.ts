import { Request, Response } from "express";
import { MeetingRepository } from "../repos/MeetingRepository";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { Meeting } from "../models/Meeting";

export async function getMeetings(req: Request, res: Response) {
    const { agentid } = req.query;
    if (agentid) {
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
    const { agentid } = req.query;
    const meetingRepository = new MeetingRepository(db);

    try {
        const meetings = await meetingRepository.getMeetingsOfAgent(agentid as string);
        res.status(200).json(meetings);
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addMeeting(req: Request, res: Response) {
    const meetingRepository = new MeetingRepository(db);
    const { time, place, client, phoneOperator, salesAgent, worker } = req.body;

    try {
        let meeting = new Meeting(time, place, client, phoneOperator, salesAgent, worker);
        meeting = await meetingRepository.save(meeting);
        res.status(201).json(meeting);
    }
    catch (error) {
        handleException(res, error);
    }

}

export async function deleteMeeting(req: Request, res: Response) {
    const meetingRepository = new MeetingRepository(db);
    const { meeting_id } = req.body;

    const idInt = parseInt(meeting_id as string);

    try {
        const result = await meetingRepository.delete(idInt);
        res.status(204).json();
    }
    catch(error) {
        handleException(res, error);
    }
}