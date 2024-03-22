import { Request, Response } from "express";
import { UserRepository } from "../../repos/UserRepository";
import bcrypt from "bcryptjs";
import db from "../../sequelize/models";
import { ChiefOperations } from "../../models/ChiefOperations";

export async function addChiefOperations(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const chiefOperations = new ChiefOperations(name, surname, email, hashedPassword); 
    const result = await userRepository.save(chiefOperations);
    res.status(200).json(result);
}