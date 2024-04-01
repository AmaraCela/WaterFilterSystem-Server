import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { MarketingManagerRepository } from "../repos/MarketingManagerRepository";
import { MarketingManager } from "../models/MarketingManager";
import { UserRole } from "../enums/UserRole";

import { handleException } from "./utils/ErrorHandler";
import db from "../sequelize/models";

import { MarketingManagerMapper } from "../mappers/MarketingManagerMapper";

export async function getAllMarketingManagers(req: Request, res: Response) {
    const marketingManagerRepository = new MarketingManagerRepository(db);
    const marketingManagers = await marketingManagerRepository.getAll();
    res.json(marketingManagers.map(MarketingManagerMapper.toDTO));
}

export async function addMarketingManager(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const marketingManagerRepository = new MarketingManagerRepository(db);

    try {
        const user = new MarketingManager(name, surname, email, password);
        user.hashPassword();

        const userSaved = await userRepository.save(user);
        user.id = userSaved.id;

        await marketingManagerRepository.save(user);

        res.status(201).json(MarketingManagerMapper.toDTO(user));
    } catch (error) {
        handleException(res, error);  
    }
}

export async function updateMarketingManager(req: Request, res: Response) {
    const { name, surname, email, password, role } = req.body;
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const marketingManagerRepository = new MarketingManagerRepository(db);

    const idInt = parseInt(id);
    try {
        const user = <MarketingManager> await userRepository.findUserById(idInt);
        if (!user || user.role !== UserRole.MARKETING_MANAGER) {
            res.status(404).json({ message: "Marketing manager not found" });
        }
        else {
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.passwordHash = password;
            user.hashPassword();

            await userRepository.save(user);
            await marketingManagerRepository.save(user);
            res.json(MarketingManagerMapper.toDTO(user));
        }
    }
    catch (error) {
        handleException(res, error);
    }
}