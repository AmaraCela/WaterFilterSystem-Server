import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { PhoneOperator } from "../models/PhoneOperator";

const db = require("../sequelize/models");

export async function addOperator(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const operator = new PhoneOperator(name, surname, email, password); 
    const result = await userRepository.save(operator);
    res.status(200).json(result);
}