import { Request, Response } from "express";
import user from "../sequelize/models/user";

export async function addOperator(req, res) {
    const { name, surname, email, password, role = "PHONE_OPERATOR" } = req.body;

    try {
        const newOperator = await user.create(name, surname, email, password, role);
    }
    catch (error) {
        res.status(500).json({errorMessage: error});
    }
}