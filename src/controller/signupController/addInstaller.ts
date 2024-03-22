import { Request, Response } from "express";
import { UserRepository } from "../../repos/UserRepository";
import bcrypt from "bcryptjs";
import db from "../../sequelize/models";
import { Installer } from "../../models/Installer";

export async function addInstaller(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;
    const userRepository = new UserRepository(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    const installer = new Installer(name, surname, email, hashedPassword); 
    const result = await userRepository.save(installer);
    res.status(200).json(result);
}