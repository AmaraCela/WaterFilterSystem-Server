import { Request, Response } from "express";
import { CallRepository } from "../repos/CallRepository";
import db from "../sequelize/models";
import { Call } from "../models/Call";

export async function addCall(req: Request, res: Response) {
    const callRepository = new CallRepository(db);
    const { client, phoneOperator, scheduledTime, outcomeComment } = req.body;
    const call = new Call(client, phoneOperator, scheduledTime, outcomeComment);
    try {
        callRepository.save(call);
    }
    catch (error) {

    }
}

export async function getCalls(req: Request, res: Response) {
    const callRepository = new CallRepository(db);
    try {
        const calls = await callRepository.getAll();
        res.status(200).json(calls);
    }
    catch (error) {

    }
}