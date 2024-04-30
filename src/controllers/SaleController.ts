import { Request, Response } from "express";
import { SaleRepository } from "../repos/SaleRepository";
import { ClientRepository } from "../repos/ClientRepository";
import { Sale } from "../models/Sale";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { SaleMapper } from "../mappers/SaleMapper";
import { PhoneOperatorRepository } from "../repos/PhoneOperatorRepository";
import { SalesAgentRepository } from "../repos/SalesAgentRepository";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid sale id")
]

export const saleValidator = [
    body('clientId').exists().withMessage("clientId field required").bail()
        .isInt().withMessage("clientId field must be an integer"),
    body('salesAgentId').exists().withMessage("salesAgentId field required").bail()
        .isInt().withMessage("salesAgentId field must be an integer"),
    body('phoneOperatorId').exists().withMessage("phoneOperatorId field required").bail()
        .isInt().withMessage("phoneOperatorId field must be an integer"),
    body('price').exists().withMessage("price field required").bail()
        .isNumeric().withMessage("price field must be a number"),
    body('warrantyExpiration').exists().withMessage("warrantyExpiration field required").bail()
        .isISO8601().toDate().withMessage("warrantyExpiration must be a valid date in ISO8601 format"),
    body('renewalDate').exists().withMessage("renewalDate field required").bail()
        .isISO8601().toDate().withMessage("renewalDate must be a valid date in ISO8601 format"),
    body('monthlyPayment').exists().withMessage("monthlyPayment field required").bail()
        .isBoolean().withMessage("monthlyPayment field must be a boolean")
]

export async function getAllSales(req: Request, res: Response) {
    const { agentid, unapproved } = req.query;
    if(agentid) {
        getSalesOfAgent(req, res);
        return;
    }
    if (unapproved) {
        getUnapprovedSales(req, res);
        return;
    }
    const saleRepository = new SaleRepository(db);
    const sales = await saleRepository.getAll();
    res.json(sales.map(sale => SaleMapper.toDTO(sale)));
}

export async function getSaleById(req: Request, res: Response) {
    const { id } = req.params;
    const saleRepository = new SaleRepository(db);
    const idInt = parseInt(id);

    try {
        const sale = await saleRepository.findSaleById(idInt);
        if (!sale) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }
        res.json(SaleMapper.toDTO(sale));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function addSale(req: Request, res: Response) {
    const { clientId, salesAgentId, phoneOperatorId, price, warrantyExpiration, renewalDate, monthlyPayment, time } = req.body;
    const saleRepository = new SaleRepository(db);
    const clientRepository = new ClientRepository(db);
    const phoneOperatorRepository = new PhoneOperatorRepository(db);
    const salesAgentRepository = new SalesAgentRepository(db);

    try {
        const client = await clientRepository.findClientById(clientId);
        if (!client) {
            res.status(400).json({ message: "Client not found" });
            return;
        }

        const salesAgent = await salesAgentRepository.findAgentById(salesAgentId);
        if (!salesAgent) {
            res.status(400).json({ message: "Sales agent not found" });
            return;
        }

        const phoneOperator = await phoneOperatorRepository.findOperatorById(phoneOperatorId);
        if (!phoneOperator) {
            res.status(400).json({ message: "Phone operator not found" });
            return;
        }

        let sale = new Sale(clientId, salesAgentId, phoneOperatorId, price, new Date(warrantyExpiration), new Date(renewalDate), monthlyPayment, [], time, false);
        sale = await saleRepository.save(sale);
        res.status(201).json(SaleMapper.toDTO(sale));
    } catch (error) {
        console.log(error);
        handleException(res, error);
    }
}

export async function updateSale(req: Request, res: Response) {
    const { clientId, salesAgentId, phoneOperatorId, price, warrantyExpiration, renewalDate, monthlyPayment } = req.body;
    const { id } = req.params;
    const saleRepository = new SaleRepository(db);
    const clientRepository = new ClientRepository(db);
    const phoneOperatorRepository = new PhoneOperatorRepository(db);
    const salesAgentRepository = new SalesAgentRepository(db);

    const idInt = parseInt(id);
    try {
        let sale = await saleRepository.findSaleById(idInt);
        if (!sale) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }
        
        const client = await clientRepository.findClientById(clientId);
        if (!client) {
            res.status(400).json({ message: "Client not found" });
            return;
        }

        const salesAgent = await salesAgentRepository.findAgentById(salesAgentId);
        if (!salesAgent) {
            res.status(400).json({ message: "Sales agent not found" });
            return;
        }

        const phoneOperator = await phoneOperatorRepository.findOperatorById(phoneOperatorId);
        if (!phoneOperator) {
            res.status(400).json({ message: "Phone operator not found" });
            return;
        }

        sale = new Sale(clientId, salesAgentId, phoneOperatorId, price, new Date(warrantyExpiration), new Date(renewalDate), monthlyPayment, sale.referredClients, sale.time, sale.approved);
        sale.id = idInt;

        await saleRepository.save(sale);
        res.json(SaleMapper.toDTO(sale));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function approveSale(req: Request, res: Response) {
    const { id } = req.params;
    const saleRepository = new SaleRepository(db);
    const idInt = parseInt(id);

    try {
        let sale = await saleRepository.findSaleById(idInt);
        if (!sale) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }

        
        sale.approved = true;
        await saleRepository.save(sale);
        res.json(SaleMapper.toDTO(sale));
    }
    catch (error) {
        handleException(res, error);
    }
}

export async function deleteSale(req: Request, res: Response) {
    const { id } = req.params;
    const saleRepository = new SaleRepository(db);
    const idInt = parseInt(id);

    try {
        const sale = await saleRepository.findSaleById(idInt);
        if (!sale) {
            res.status(404).json({ message: "Sale not found" });
            return;
        }

        await saleRepository.delete(sale);
        res.status(204).send();
    }
    catch (error) {
        handleException(res, error);
    }
}


async function getSalesOfAgent(req: Request, res: Response) {
    const { agentid } = req.query;
    const idInt = parseInt(agentid as string);

    const salesRepository = new SaleRepository(db);
    try {
        let sales = await salesRepository.getAllOfAgent(idInt);
        res.status(200).json(sales);
    }
    catch(error) {
        handleException(res, error);
    }
}

async function getUnapprovedSales(req: Request, res: Response) {
    const salesRepository = new SaleRepository(db);
    try{
        let sales = await salesRepository.getUnapprovedSales();
        res.status(200).json(sales);
    }
    catch(error) {
        handleException(res, error);
    }
}