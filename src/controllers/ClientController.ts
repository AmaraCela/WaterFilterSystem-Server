import { Request, Response } from "express";
import { ClientRepository } from "../repos/ClientRepository";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { Client } from "../models/Client";
import { ClientMapper } from "../mappers/ClientMapper";
import { ClientStatus } from "../enums/ClientStatus";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid call id")
]

export const clientValidator = [
    body('phoneNo').exists().withMessage("phoneNo field required"),
    body('lastCallDate').optional().isISO8601().toDate().withMessage("lastCallDate must be a valid date in ISO8601 format"),
    body('nextContactDate').optional().isISO8601().toDate().withMessage("nextContactDate must be a valid date in ISO8601 format"),
    body('referredBy').optional().isInt().withMessage("referredBy must be an integer"),
    body('status').optional().isIn(ClientStatus).withMessage("Invalid status"),
    body('assignedOperator').optional().isInt().withMessage("assignedOperator must be an integer"),
    body('referredInSale').optional().isInt().withMessage("referredInSale must be an integer")
]

export async function getClientsByStatus(req: Request, res: Response) {
    const { status } = req.query;

    const clientRepository = new ClientRepository(db);
    try {
        if (status == ClientStatus[ClientStatus.IN_REDLIST]) {
            const redlistClients = await clientRepository.getRedListClients();
            res.json(redlistClients.map(client => ClientMapper.toDTO(client)));
        }
        else if (status === ClientStatus[ClientStatus.IN_WAITLIST]) {
            const waitlistClients = await clientRepository.getWaitListClients();
            res.json(waitlistClients.map(client => ClientMapper.toDTO(client)));
        }
        else {
            res.status(400).json({ message: "Invalid status" });
        }
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function getBuyers(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    try {
        const buyers = await clientRepository.findBuyers();
        res.status(200).json(buyers);
    }
    catch (error) {
        handleException(res, error);
    }

}

export async function getReferences(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    try {
        const references = await clientRepository.findReferences();
        res.status(200).json(references);
    }
    catch (error) {
        handleException(res, error);
    }

}


export async function getAllClients(req: Request, res: Response) {
    const { status, type, search } = req.query;
    if (status) {
        getClientsByStatus(req, res);
        return;
    }

    if (type && type === "Buyers") {
        getBuyers(req, res);
        return;
    }

    if(type && type === "References") {
        getReferences(req, res);
        return; 
    }


    if (search) {
        searchClients(req, res);
        return;
    }

    const clientRepository = new ClientRepository(db);
    try {
        const clients = await clientRepository.getAll();
        res.json(clients.map(client => ClientMapper.toDTO(client)));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function getClientById(req: Request, res: Response) {
    const { id } = req.params;
    const clientRepository = new ClientRepository(db);
    const idInt = parseInt(id);

    try {
        const client = await clientRepository.findClientById(idInt);
        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.json(ClientMapper.toDTO(client));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addClient(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    const { name, surname, phoneNo, address, profession, hasMadePurchase, lastCallDate, nextContactDate, status, assigenedOperator, referredBy, referredInSale } = req.body;

    try {
        let referredByClientId: number|null = null;
        if (referredBy) {
            const referredByClient = await clientRepository.findClientById(referredBy);
            if (!referredByClient) {
                res.status(400).json({ message: "Referrer not found" });
                return;
            }
            referredByClientId = referredByClient.id;
        }
        let client = new Client(name, surname, phoneNo, address, profession, hasMadePurchase, lastCallDate, nextContactDate, [], status, referredByClientId, assigenedOperator, referredInSale);
        client = await clientRepository.save(client);
        res.status(201).json(ClientMapper.toDTO(client));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function updateClient(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    const { id } = req.params;
    const { name, surname, phoneNo, address, profession, hasMadePurchase, lastCallDate, nextContactDate, referrals, status, referredBy, assigenedOperator, referredInSale } = req.body;
    const idInt = parseInt(id);

    try {
        let client = await clientRepository.findClientById(idInt);
        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }

        client = new Client(name, surname, phoneNo, address, profession, hasMadePurchase, lastCallDate, nextContactDate, referrals, ClientStatus[<string>status as keyof typeof ClientStatus], referredBy, assigenedOperator, referredInSale);
        client.id = idInt;

        clientRepository.save(client);
        res.json(ClientMapper.toDTO(client));
    }
    catch (error) {
        console.log(error);
        handleException(res, error);
    }
}

export async function deleteClient(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    const { id } = req.params;
    const idInt = parseInt(id);

    try {
        const client = await clientRepository.findClientById(idInt);
        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }

        await clientRepository.delete(client);
        res.status(204).send();
    }
    catch (error) {
        handleException(res, error);
    }
}

async function searchClients(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    const { search } = req.query;

    try {
        const clients = await clientRepository.findClientsByName(search as string);
        res.status(200).json(clients);

    }
    catch (error) {
        handleException(res, error);
    }
}