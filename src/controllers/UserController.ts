import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { UserMapper } from "../mappers/UserMapper";
import { PhoneOperatorMapper } from "../mappers/PhoneOperatorMapper";

import db from "../sequelize/models";

import { handleError } from "../utils/ErrorHandler";
import { UserRole } from "../enums/UserRole";
import { PhoneOperator } from "../models/PhoneOperator";

export async function getAllUsers(req: Request, res: Response) {
    const userRepository = new UserRepository(db);
    const users = await userRepository.getAll();
    res.json(users.map(UserMapper.toDTO));
}

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const idInt = parseInt(id);

    if (isNaN(idInt)) {
        res.status(400).json({ message: "Invalid user id" });
        return;
    }

    try {
        const user = await userRepository.findUserById(idInt);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        else {
            switch (user.role) {
                case UserRole.PHONE_OPERATOR:
                    res.status(200).json(PhoneOperatorMapper.toDTO(<PhoneOperator>user));
                    break;
                default:
                    res.status(200).json(UserMapper.toDTO(user));
                    break;
            }
        }
    }
    catch (error) {
        handleError(res, error);
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const idInt = parseInt(id);

    if (isNaN(idInt)) {
        res.status(400).json({ message: "Invalid user id" });
        return;
    }

    try {
        const user = await userRepository.findUserById(idInt);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        await userRepository.delete(user);
        res.status(204).send();
    }
    catch (error) {
        handleError(res, error);
    }
}