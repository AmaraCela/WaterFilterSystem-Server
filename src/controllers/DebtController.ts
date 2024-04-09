import { Request, Response } from "express";
import { DebtRepository } from "../repos/DebtRepository";
import { ClientRepository } from "../repos/ClientRepository";
import { Debt } from "../models/Debt";

import db from "../sequelize/models";

import { handleException } from "./utils/ErrorHandler";
import { DebtMapper } from "../mappers/DebtMapper";
import { PhoneOperatorRepository } from "../repos/PhoneOperatorRepository";
import { PhoneOperator } from "../models/PhoneOperator";
import { SaleRepository } from "../repos/SaleRepository";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid debt id")
]

export const debtValidator = [
]

export async function getAllDebts(req: Request, res: Response) {
    const debtRepository = new DebtRepository(db);
    const debts = await debtRepository.getAll();
    res.json(debts.map(debt => DebtMapper.toDTO(debt)));
}

export async function getDebtById(req: Request, res: Response) {
    const { id } = req.params;
    const debtRepository = new DebtRepository(db);
    const idInt = parseInt(id);

    try {
        const debt = await debtRepository.findDebtBySaleId(idInt);
        if (!debt) {
            res.status(404).json({ message: "Debt not found" });
            return;
        }
        res.json(DebtMapper.toDTO(debt));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addDebt(req: Request, res: Response) {
    const { nextPayment, amountPaidOff, amountToCollect } = req.body;
    const { id } = req.params;
    const debtRepository = new DebtRepository(db);
    const saleRepository = new SaleRepository(db);

    const idInt = parseInt(id);
    try {
        const sale = await saleRepository.findSaleById(idInt);
        if (!sale) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }

        let debt = new Debt(nextPayment, amountPaidOff, amountToCollect, idInt);
        debt = await debtRepository.save(debt);
        res.status(201).json(DebtMapper.toDTO(debt));
    } catch (error) {
        handleException(res, error);
    }
}

export async function updateDebt(req: Request, res: Response) {
    const { nextPayment, amountPaidOff, amountToCollect } = req.body;
    const { id } = req.params;
    const debtRepository = new DebtRepository(db);
    const saleRepository = new SaleRepository(db);

    const idInt = parseInt(id);
    try {
        const sale = await saleRepository.findSaleById(idInt);
        if (!sale) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }

        let debt = await debtRepository.findDebtBySaleId(idInt);
        if (!debt) {
            res.status(404).json({ message: "Debt not found" });
            return;
        }
        
        debt = new Debt(nextPayment, amountPaidOff, amountToCollect, idInt);

        await debtRepository.save(debt);
        res.json(DebtMapper.toDTO(debt));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteDebt(req: Request, res: Response) {
    const { id } = req.params;
    const debtRepository = new DebtRepository(db);
    const idInt = parseInt(id);

    try {
        const debt = await debtRepository.findDebtBySaleId(idInt);
        if (!debt) {
            res.status(404).json({ message: "Debt not found" });
            return;
        }

        await debtRepository.delete(debt);
        res.status(204).send();
    }
    catch (error) {
        handleException(res, error);
    }
}
