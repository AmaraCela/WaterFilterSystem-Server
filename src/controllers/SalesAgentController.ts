import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { SalesAgentRepository } from "../repos/SalesAgentRepository";
import { SalesAgent } from "../models/SalesAgent";
import { UserRole } from "../enums/UserRole";
import { handleException } from "./utils/ErrorHandler";
import db from "../sequelize/models";

import { SalesAgentMapper } from "../mappers/SalesAgentMapper";

export async function getAllSalesAgents(req: Request, res: Response) {
    const salesAgentRepository = new SalesAgentRepository(db);
    const salesAgents = await salesAgentRepository.getAll();
    res.json(salesAgents.map(SalesAgentMapper.toDTO));
}

export async function getSalesAgentById(req: Request, res: Response) {
    const { id } = req.params;
    const salesAgentRepository = new SalesAgentRepository(db);
    const idInt = parseInt(id);

    try {
        const salesAgent = await salesAgentRepository.findAgentById(idInt);
        if (!salesAgent) {
            res.status(404).json({ message: "Sales agent not found" });
            return;
        }
        res.json(SalesAgentMapper.toDTO(salesAgent));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addSalesAgent(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const salesAgentRepository = new SalesAgentRepository(db);

    try {
        const user = new SalesAgent(name, surname, email, password);
        user.hashPassword();

        const userSaved = await userRepository.save(user);
        user.id = userSaved.id;

        await salesAgentRepository.save(user);

        res.status(201).json(SalesAgentMapper.toDTO(user));
    } catch (error) {
        handleException(res, error);  
    }
}

export async function updateSalesAgent(req: Request, res: Response) {
    const { name, surname, email, password, role } = req.body;
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const salesAgentRepository = new SalesAgentRepository(db);

    const idInt = parseInt(id);
    try {
        const user = <SalesAgent> await userRepository.findUserById(idInt);
        if (!user || user.role !== UserRole.SALES_AGENT) {
            res.status(404).json({ message: "Phone agent not found" });
        }
        else {
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.passwordHash = password;
            user.hashPassword();

            await userRepository.save(user);
            await salesAgentRepository.save(user);
            res.json(SalesAgentMapper.toDTO(user));
        }
    }
    catch (error) {
        handleException(res, error);
    }
}