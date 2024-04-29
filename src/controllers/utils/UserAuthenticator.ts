const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
import { User } from "../../models/User";
import { UserRepository } from "../../repos/UserRepository";
import db from "../../sequelize/models";
import { UserRole } from "../../enums/UserRole";

async function getUser(req: Request) {
    let token = req.get("Authorization");
    if (!token) {
        token = req.cookies["token"];
        
        if (!token) {
            return null;
        }
    }
    else {
        token = token.replace("Bearer ", "");
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decode.id;
        const userRepository = new UserRepository(db);
        return await userRepository.findUserById(user_id);
    }
    catch (error) {
        return null;
    }
}

export async function requireAdmin(req: Request, res: Response, next: any) {
    const user = await getUser(req);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role !== UserRole.ADMINISTRATOR) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    next();
}

export async function requireChiefOfOperations(req: Request, res: Response, next: any) {
    const user = await getUser(req);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role == UserRole.ADMINISTRATOR) {
        next();
        return;
    }

    if (user.role !== UserRole.CHIEF_OF_OPERATIONS) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    next();
}

export async function requirePhoneOperator(req: Request, res: Response, next: any) {
    const user = await getUser(req);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role == UserRole.ADMINISTRATOR) {
        next();
        return;
    }

    if (user.role !== UserRole.PHONE_OPERATOR) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    next();
}

export async function requireSalesAgent(req: Request, res: Response, next: any) {
    const user = await getUser(req);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role == UserRole.ADMINISTRATOR) {
        next();
        return;
    }

    if (user.role !== UserRole.SALES_AGENT) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    next();
}