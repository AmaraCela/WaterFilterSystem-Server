import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { handleError } from "../utils/ErrorHandler";

import bcrypt from "bcryptjs";

const db = require("../sequelize/models");
const jwt = require('jsonwebtoken');

const { param, body } = require('express-validator');

export const loginValidator = [
    body('email').exists().isEmail().withMessage("Email field missing or invalid"),
    body('password').exists().withMessage("Password field required")
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

        res.json({ token });
    }
    catch (error) {
        handleError(res, error);
    }
}