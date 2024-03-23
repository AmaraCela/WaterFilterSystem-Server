import { Request, Response } from "express";
import { UserRepository } from "../../repos/UserRepository";
import bcrypt from "bcryptjs";
import db from "../../sequelize/models";
import { InventoryManager } from "../../models/InventoryManager";

export async function addInventoryManager(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const inventoryManager = new InventoryManager(name, surname, email, hashedPassword); 
    const result = await userRepository.save(inventoryManager);
    res.status(200).json(result);
}