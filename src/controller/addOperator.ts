import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { PhoneOperator } from "../models/PhoneOperator";
import bcrypt from "bcryptjs";

const db = require("../sequelize/models");

export async function addOperator(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const operator = new PhoneOperator(name, surname, email, hashedPassword); 
    const result = await userRepository.save(operator);
    res.status(200).json(result);
}