import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { handleException } from "./utils/ErrorHandler";

import bcrypt from "bcryptjs";

const db = require("../sequelize/models");
const jwt = require('jsonwebtoken');

const { param, body } = require('express-validator');

export const loginValidator = [
    body('email').notEmpty().withMessage("Email field required").bail()
        .isEmail().withMessage("Invalid email"),

    body('password').notEmpty().withMessage("Password field required").bail()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
]

export async function createSession(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = new UserRepository(db);

    try {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            res.status(401).json({ message: "Wrong credentials" });
            return;
        }

        const result = await bcrypt.compare(password, user.passwordHash);
        if (!result) {
            res.status(401).json({ message: "Wrong credentials" });
            return;
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.json({ token, user_id: user.id, name: user.name, surname: user.surname });
        res.cookie('session', token, { httpOnly: true });
    }
    catch (error) {
        handleException(res, error);
    }
}