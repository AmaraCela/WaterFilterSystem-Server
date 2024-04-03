import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { PhoneOperatorRepository } from "../repos/PhoneOperatorRepository";
import { PhoneOperator } from "../models/PhoneOperator";
import { UserRole } from "../enums/UserRole";
import { handleException } from "./utils/ErrorHandler";
import db from "../sequelize/models";

import { PhoneOperatorMapper } from "../mappers/PhoneOperatorMapper";

export async function getAllPhoneOperators(req: Request, res: Response) {
    const phoneOperatorRepository = new PhoneOperatorRepository(db);
    const phoneOperators = await phoneOperatorRepository.getAll();
    res.json(phoneOperators.map(PhoneOperatorMapper.toDTO));
}

export async function getPhoneOperatorById(req: Request, res: Response) {
    const { id } = req.params;
    const phoneOperatorRepository = new PhoneOperatorRepository(db);
    const idInt = parseInt(id);

    try {
        const phoneOperator = await phoneOperatorRepository.findOperatorById(idInt);
        if (!phoneOperator) {
            res.status(404).json({ message: "Phone operator not found" });
            return;
        }
        res.json(PhoneOperatorMapper.toDTO(phoneOperator));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addPhoneOperator(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const phoneOperatorRepository = new PhoneOperatorRepository(db);

    try {
        const user = new PhoneOperator(name, surname, email, password);
        user.hashPassword();

        const userSaved = await userRepository.save(user);
        user.id = userSaved.id;

        await phoneOperatorRepository.save(user);

        res.status(201).json(PhoneOperatorMapper.toDTO(user));
    } catch (error) {
        handleException(res, error);  
    }
}

export async function updatePhoneOperator(req: Request, res: Response) {
    const { name, surname, email, password, role } = req.body;
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const phoneOperatorRepository = new PhoneOperatorRepository(db);

    const idInt = parseInt(id);
    try {
        const user = <PhoneOperator> await userRepository.findUserById(idInt);
        if (!user || user.role !== UserRole.PHONE_OPERATOR) {
            res.status(404).json({ message: "Phone operator not found" });
        }
        else {
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.passwordHash = password;
            user.hashPassword();

            await userRepository.save(user);
            await phoneOperatorRepository.save(user);
            res.json(PhoneOperatorMapper.toDTO(user));
        }
    }
    catch (error) {
        handleException(res, error);
    }
}