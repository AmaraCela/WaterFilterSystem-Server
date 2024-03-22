import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import bcrypt from "bcryptjs";

import db from "../sequelize/models";
import { SalesAgent } from "../models/SalesAgent";

export async function addAgent(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const salesAgent = new SalesAgent(name, surname, email, hashedPassword); 
    const result = await userRepository.save(salesAgent);
    res.status(200).json(result);
}