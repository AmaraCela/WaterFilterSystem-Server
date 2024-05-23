const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
import { User } from "../../models/User";
import { UserRepository } from "../../repos/UserRepository";
import db from "../../sequelize/models";
import { UserRole } from "../../enums/UserRole";
import { handleException } from "./ErrorHandler";

async function getUser(req: Request) {
    let token = req.get("Authorization");
    if (!token) {
        if (!req.cookies) {
            return null;
        }

        token = req.cookies["session"];
        
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

function skipAuth() {
    // return false; // uncomment if you want to test authentication
    return process.env.NODE_ENV === 'development';
}

export async function requireSelf(req: Request, res: Response, next: any) {
    if (skipAuth()) {
        next();
        return;
    }

    const userRepository = new UserRepository(db);
    const { id } = req.params;
    const idInt = parseInt(id);

    try {
        const self = await getUser(req);
        if (!self) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (self.role === UserRole.ADMINISTRATOR) {
            next();
            return;
        }

        const user = await userRepository.findUserById(idInt);
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (user.id != self.id) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }

        next();
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function requireAdmin(req: Request, res: Response, next: any) {
    if (skipAuth()) {
        next();
        return;
    }
    
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
    if (skipAuth()) {
        next();
        return;
    }
    
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

export async function requireMarketingManager(req: Request, res: Response, next: any) {
    if (skipAuth()) {
        next();
        return;
    }
    
    const user = await getUser(req);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role == UserRole.ADMINISTRATOR) {
        next();
        return;
    }

    if (user.role !== UserRole.MARKETING_MANAGER) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    next();
}

export async function requirePhoneOperator(req: Request, res: Response, next: any) {
    const user = await getUser(req);
    (<any>req).user = user;
    
    if (skipAuth()) {
        next();
        return;
    }

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role == UserRole.ADMINISTRATOR || user.role == UserRole.MARKETING_MANAGER || user.role == UserRole.CHIEF_OF_OPERATIONS) {
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
    if (skipAuth()) {
        next();
        return;
    }
    
    const user = await getUser(req);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    if (user.role == UserRole.ADMINISTRATOR || user.role == UserRole.MARKETING_MANAGER || user.role == UserRole.CHIEF_OF_OPERATIONS) {
        next();
        return;
    }

    if (user.role !== UserRole.SALES_AGENT) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    next();
}