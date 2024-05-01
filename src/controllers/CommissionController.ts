import { Request, Response } from "express";
import { CommissionRepository } from "../repos/CommissionRepository";
import { Commission } from "../models/Commission";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { CommissionMapper } from "../mappers/CommissionMapper";
import { UserRepository } from "../repos/UserRepository";
import { CommissionType } from "../enums/CommissionType";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid commission id")
]

export const commissionValidator = [
    body('amount').exists().withMessage("amount field required").bail()
        .isNumeric().withMessage("clientId field must be a number"),
    body('userPaidTo').exists().withMessage("userPaidTo field required").bail()
        .isInt().withMessage("userPaidTo field must be an integer"),
    body('type').exists().withMessage("type field required").bail()
        .isIn(CommissionType).withMessage("Invalid type")
]

export async function getAllCommissions(req: Request, res: Response) {
    const commissionRepository = new CommissionRepository(db);
    const { unapproved } = req.query;
    if(unapproved) {
        console.log('eyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
        getUnapprovedComissions(req, res);
        return;
    }
    const commissions = await commissionRepository.getAll();
    res.status(200).json(commissions)
}

async function getUnapprovedComissions(req: Request, res: Response) {
    const commissionRepository = new CommissionRepository(db);
    const commissions = await commissionRepository.getUnapproved();
    res.status(200).json(commissions)
}

export async function getCommissionById(req: Request, res: Response) {
    const { id } = req.params;
    const commissionRepository = new CommissionRepository(db);
    const idInt = parseInt(id);

    try {
        const commission = await commissionRepository.findCommissionById(idInt);
        if (!commission) {
            res.status(404).json({ message: "Commission not found" });
            return;
        }
        res.json(CommissionMapper.toDTO(commission));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addCommission(req: Request, res: Response) {
    const { amount, userPaidTo, type } = req.body;
    const commissionRepository = new CommissionRepository(db);
    const userRepository = new UserRepository(db);

    try {
        const user = await userRepository.findUserById(userPaidTo);
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        let commission = new Commission(userPaidTo, CommissionType[<string>type as keyof typeof CommissionType], amount, false);
        commission = await commissionRepository.save(commission);
        res.status(201).json(CommissionMapper.toDTO(commission));
    } catch (error) {
        console.log(error);
        handleException(res, error);
    }
}

export async function updateCommission(req: Request, res: Response) {
    const { amount, userPaidTo, type } = req.body;
    const { id } = req.params;
    const commissionRepository = new CommissionRepository(db);
    const userRepository = new UserRepository(db);

    const idInt = parseInt(id);
    try {
        let commission = await commissionRepository.findCommissionById(idInt);
        if (!commission) {
            res.status(404).json({ message: "Commission not found" });
            return;
        }
        
        const user = await userRepository.findUserById(userPaidTo);
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        commission = new Commission(userPaidTo, CommissionType[<string>type as keyof typeof CommissionType], amount, false);
        commission.id = idInt;

        await commissionRepository.save(commission);
        res.json(CommissionMapper.toDTO(commission));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function approveCommission(req: Request, res: Response) {
    const { id } = req.params;
    const commissionRepository = new CommissionRepository(db);
    const idInt = parseInt(id);

    try {
        let commission = await commissionRepository.findCommissionById(idInt);
        if (!commission) {
            res.status(404).json({ message: "Commission not found" });
            return;
        }
        
        commission.approved = true;
        await commissionRepository.save(commission);
        res.json(CommissionMapper.toDTO(commission));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteCommission(req: Request, res: Response) {
    const { id } = req.params;
    const commissionRepository = new CommissionRepository(db);
    const idInt = parseInt(id);

    try {
        const commission = await commissionRepository.findCommissionById(idInt);
        if (!commission) {
            res.status(404).json({ message: "Commission not found" });
            return;
        }

        await commissionRepository.delete(commission);
        res.status(204).send();
    }
    catch (error) {
        handleException(res, error);
    }
}