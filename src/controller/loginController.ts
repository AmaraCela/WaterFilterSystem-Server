import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
const db = require("../sequelize/models");

export async function loginUser(req: Request, res: Response) {
    const {email, password} = req.body;
    const userRepository = new UserRepository(db);
    const result = await userRepository.login(email, password);

    typeof(result) === 'object' ? res.status(200).json(result) : res.status(500).json({errorMessage: result});
}
