import { Request, Response } from "express";
import { MeetingRepository } from "../repos/MeetingRepository";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { Meeting } from "../models/Meeting";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid meeting id")
]

export const meetingValidator = [
    // TODO
]

export async function getAllMeetings(req: Request, res: Response) {
    const { agentid } = req.query;
    if (agentid) {
        getMeetingsOfAgent(req, res);
        return;
    }

    const meetingRepository = new MeetingRepository(db);
    try {
        const meetings = await meetingRepository.getAll();
        res.status(200).json(meetings); // TODO USE DTO
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
        res.status(200).json(meetings); // TODO USE DTO
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function getMeetingById(req: Request, res: Response) {
    const meetingRepository = new MeetingRepository(db);
    const { id } = req.params;
    const idInt = parseInt(id);

    try {
        const meeting = await meetingRepository.findMeetingById(idInt);
        if (!meeting) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }
        res.status(200).json(meeting); // TODO USE DTO
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
        res.status(201).json(meeting); // TODO USE DTO
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function updateMeeting(req: Request, res: Response) {
    const meetingRepository = new MeetingRepository(db);
    const { meeting_id, time, place, client, phoneOperator, salesAgent, worker } = req.body;

    const idInt = parseInt(meeting_id);

    try {
        let meeting = await meetingRepository.findMeetingById(idInt);
        if (!meeting) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }

        meeting = new Meeting(time, place, client, phoneOperator, salesAgent, worker);
        await meetingRepository.save(meeting);
        res.status(200).json(meeting); // TODO USE DTO
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteMeeting(req: Request, res: Response) {
    const meetingRepository = new MeetingRepository(db);
    const { id } = req.params;

    const idInt = parseInt(id);
    try {
        let meeting = await meetingRepository.findMeetingById(idInt);
        if (!meeting) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }

        await meetingRepository.delete(idInt);
        res.status(204).send();
    }
    catch(error) {
        handleException(res, error);
    }
}