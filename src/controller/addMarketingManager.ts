import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import bcrypt from "bcryptjs";
import db from "../sequelize/models";
import { MarketingManager } from "../models/MarketingManager";

export async function addMarketingManager(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const marketingManager = new MarketingManager(name, surname, email, hashedPassword); 
    const result = await userRepository.save(marketingManager);
    res.status(200).json(result);
}