import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { ChiefOfOperationsRepository } from "../repos/ChiefOfOperationsRepository";
import { ChiefOfOperations } from "../models/ChiefOfOperations";
import { UserRole } from "../enums/UserRole";

import { handleException } from "./utils/ErrorHandler";
import db from "../sequelize/models";

import { ChiefOfOperationsMapper } from "../mappers/ChiefOfOperationsMapper";

export async function getAllChiefOfOperations(req: Request, res: Response) {
    const marketingManagerRepository = new ChiefOfOperationsRepository(db);
    const marketingManagers = await marketingManagerRepository.getAll();
    res.json(marketingManagers.map(ChiefOfOperationsMapper.toDTO));
}

export async function getChiefOfOperationsById(req: Request, res: Response) {
    const { id } = req.params;
    const marketingManagerRepository = new ChiefOfOperationsRepository(db);
    const idInt = parseInt(id);

    try {
        const user = await marketingManagerRepository.findChiefById(idInt);
        if (!user) {
            res.status(404).json({ message: "Chief of operations not found" });
            return;
        }
        res.json(ChiefOfOperationsMapper.toDTO(user));
    }
    catch (error) {
        handleException(res, error);
    }

}

export async function addChiefOfOperations(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const marketingManagerRepository = new ChiefOfOperationsRepository(db);

    try {
        const user = new ChiefOfOperations(name, surname, email, password);
        user.hashPassword();

        const userSaved = await userRepository.save(user);
        user.id = userSaved.id;

        await marketingManagerRepository.save(user);

        res.status(201).json(ChiefOfOperationsMapper.toDTO(user));
    } catch (error) {
        handleException(res, error);  
    }
}

export async function updateChiefOfOperations(req: Request, res: Response) {
    const { name, surname, email, password, role } = req.body;
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const marketingManagerRepository = new ChiefOfOperationsRepository(db);

    const idInt = parseInt(id);
    try {
        const user = <ChiefOfOperations> await userRepository.findUserById(idInt);
        if (!user || user.role !== UserRole.CHIEF_OF_OPERATIONS) {
            res.status(404).json({ message: "Chief of operations not found" });
        }
        else {
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.passwordHash = password;
            user.hashPassword();

            await userRepository.save(user);
            await marketingManagerRepository.save(user);
            res.json(ChiefOfOperationsMapper.toDTO(user));
        }
    }
    catch (error) {
        handleException(res, error);
    }
}