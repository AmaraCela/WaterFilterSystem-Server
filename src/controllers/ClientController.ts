import { Request, Response } from "express";
import { ClientRepository } from "../repos/ClientRepository";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { Client } from "../models/Client";

export async function getRedListClients(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    try{
        const redlistClients = await clientRepository.getRedListClients();
        res.status(201).json(redlistClients);
    }
    catch(error) {
        handleException(res, error);
    }
}

export async function addClient(req: Request, res: Response) {
    const clientRepository = new ClientRepository(db);
    const { name, surname, phoneNo, address, profession, hasMadePurchase, lastCallDate, nextContactDate, status, assigenedOperator, referredBy, referredInSale } = req.body;
    const client = new Client(name, surname, phoneNo, address, profession, hasMadePurchase, lastCallDate, nextContactDate, status, assigenedOperator, referredBy, referredInSale);
    
    try{
        clientRepository.save(client);
        res.status(200).json({});
    }
    catch(error) {
        handleException(res, error);
    }
}