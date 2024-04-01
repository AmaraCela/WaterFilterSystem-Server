import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { UserMapper } from "../mappers/UserMapper";
import { PhoneOperatorMapper } from "../mappers/PhoneOperatorMapper";

import db from "../sequelize/models";

import { handleException } from "./utils/ErrorHandler";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid user id")
]

export const userValidator = [
    body('name').exists().withMessage("Name field required"),
    body('surname').exists().withMessage("Surname field required"),
    body('email').exists().withMessage("Email field required").bail()
        .isEmail().withMessage("Invalid email address"),
    body('password').exists().withMessage("Password field required")
]

export async function getAllUsers(req: Request, res: Response) {
    const userRepository = new UserRepository(db);
    const users = await userRepository.getAll();
    res.json(users.map(UserMapper.toDTO));
}

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const idInt = parseInt(id);

    try {
        const user = await userRepository.findUserById(idInt);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(UserMapper.toDTO(user));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userRepository = new UserRepository(db);
    const idInt = parseInt(id);

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
        handleException(res, error);
    }
}