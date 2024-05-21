import { Request, Response } from "express";
import { CallRepository } from "../repos/CallRepository";
import { ClientRepository } from "../repos/ClientRepository";
import { Call } from "../models/Call";

import db from "../sequelize/models";

import { handleException } from "./utils/ErrorHandler";
import { CallMapper } from "../mappers/CallMapper";
import { PhoneOperatorRepository } from "../repos/PhoneOperatorRepository";
import { PhoneOperator } from "../models/PhoneOperator";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid call id")
]

export const callValidator = [
    body('clientId').exists().withMessage("clientId field required").bail()
        .isInt().withMessage("clientId field must be an integer"),
    body('phoneOperatorId').exists().withMessage("phoneOperatorId field required").bail()
        .isInt().withMessage("phoneOperatorId field must be an integer"),
    body('scheduledTime').exists().withMessage("scheduledTime field required").bail().
        isISO8601().toDate().withMessage("scheduledTime must be a valid date in ISO8601 format"),
]

export async function getAllCalls(req: Request, res: Response) {
    const callRepository = new CallRepository(db);
    const calls = await callRepository.getAll();
    res.json(calls.map(call => CallMapper.toDTO(call)));
}

export async function filterAllowedCallsForPhoneOperator(req: Request, res: Response, next: any) {
    const user = (<any>req).user as PhoneOperator ?? null;
    if (!user) {
        (<any>req).allowedCalls = [];
        (<any>req).redactedCalls = [];

        next();
        return;
    }

    const callRepository = new CallRepository(db);
    const calls = await callRepository.getAll();

    const allowedCalls = calls.filter(call => call.phoneOperator === user.id && !call.completed);
    const redactedCalls = calls.filter(call => call.phoneOperator === user.id && call.completed);

    (<any>req).allowedCalls = allowedCalls;
    (<any>req).redactedCalls = redactedCalls;

    next();
}

export async function getReservedCalls(req: Request, res: Response) {
    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const { id } = req.params;
    try {
        const callRepository = new CallRepository(db);
        let calls = await callRepository.getAll();
        if (id) {
            calls = calls.filter(call => {
                const callDate = new Date(call.scheduledTime);
                return call.phoneOperator === parseInt(id) && callDate.getDate() === date && callDate.getMonth() === month && callDate.getFullYear() === year
            });
            return res.status(200).json(calls.map(CallMapper.toDTO));
        }
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function getLatestReferences(req: Request, res: Response) {
    const callRepository = new CallRepository(db);
    try {
        let calls = await callRepository.getAll();
        calls = calls.filter(call => call.completed === false && call.scheduledTime === null);
        return res.status(200).json(calls.map(CallMapper.toDTO));
    }
    catch (error) {
        handleException(res, error)
    }
}

export async function getCallById(req: Request, res: Response) {
    const { id } = req.params;
    const callRepository = new CallRepository(db);
    const idInt = parseInt(id);

    try {
        const call = await callRepository.findCallById(idInt);
        if (!call) {
            res.status(404).json({ message: "Call not found" });
            return;
        }

        const allowed = (<any>req).allowedCalls.find((c: any) => c.id === call.id);
        if (!allowed) {
            const redacted = (<any>req).redactedCalls.find((c: any) => c.id === call.id);
            if (!redacted) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }

            res.json(CallMapper.toDTORedacted(call));
            return;
        }

        res.json(CallMapper.toDTO(call));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addCall(req: Request, res: Response) {
    const { clientId, phoneOperatorId, scheduledTime } = req.body;
    const callRepository = new CallRepository(db);
    const clientRepository = new ClientRepository(db);
    const phoneOperatorRepository = new PhoneOperatorRepository(db);

    try {
        const client = await clientRepository.findClientById(clientId);

        if (!client) {
            res.status(400).json({ message: "Client not found" });
            return;
        }

        const phoneOperator = await phoneOperatorRepository.findOperatorById(phoneOperatorId);
        if (!phoneOperator) {
            res.status(400).json({ message: "Phone operator not found" });
            return;
        }

        let call = new Call(clientId, phoneOperatorId, new Date(scheduledTime));
        call = await callRepository.save(call);
        res.status(201).json(CallMapper.toDTO(call));
    } catch (error) {
        handleException(res, error);
    }
}

export async function updateCall(req: Request, res: Response) {
    const { clientId, phoneOperatorId, scheduledTime, outcomeComment, completed } = req.body;
    const { id } = req.params;
    const callRepository = new CallRepository(db);
    const clientRepository = new ClientRepository(db);
    const phoneOperatorRepository = new PhoneOperatorRepository(db);

    const idInt = parseInt(id);
    try {
        const client = await clientRepository.findClientById(clientId);
        if (!client) {
            res.status(400).json({ message: "Client not found" });
            return;
        }

        const phoneOperator = await phoneOperatorRepository.findOperatorById(phoneOperatorId);
        if (!phoneOperator) {
            res.status(400).json({ message: "Phone operator not found" });
            return;
        }

        let call = await callRepository.findCallById(idInt);
        if (!call) {
            res.status(404).json({ message: "Call not found" });
            return;
        }

        call = new Call(clientId, phoneOperatorId, new Date(scheduledTime), outcomeComment, completed);
        call.id = idInt;

        await callRepository.save(call);
        res.json(CallMapper.toDTO(call));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteCall(req: Request, res: Response) {
    const { id } = req.params;
    const callRepository = new CallRepository(db);
    const idInt = parseInt(id);

    try {
        const call = await callRepository.findCallById(idInt);
        if (!call) {
            res.status(404).json({ message: "Call not found" });
            return;
        }

        await callRepository.delete(call);
        res.status(204).send();
    }
    catch (error) {
        handleException(res, error);
    }
}
