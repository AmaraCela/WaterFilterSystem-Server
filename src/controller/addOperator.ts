import { Request, Response } from "express";
import { UserRepository } from "../repos/UserRepository";
import { PhoneOperator } from "../models/PhoneOperator";

const db = require("../sequelize/models");

export async function addOperator(req: Request, res: Response) {
    const userRepository = new UserRepository(db);
    const operator = new PhoneOperator("John", "Doe", "john.doe@example.com", "password"); 
    const result = await userRepository.save(operator);
    console.log(result);
    res.status(200).json(result);
}