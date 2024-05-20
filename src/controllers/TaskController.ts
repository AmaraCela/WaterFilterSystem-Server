import { Request, Response } from "express";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { TaskRepository } from "../repos/TaskRespository";
import { TaskMapper } from "../mappers/TaskMapper";
import { ClientRepository } from "../repos/ClientRepository";
import { Task } from "../models/Task";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid task id")
]

export const taskValidator = [
    body('client').exists().withMessage("client field required").bail()
        .isInt().withMessage("client field must be an integer"),
    body('installer').exists().withMessage("installer field required").bail()
        .isInt().withMessage("installer field must be an integer"),
    body('type').exists().withMessage("type field required").bail(),
]

export async function getAllTasks(req: Request, res: Response) {
    const taskRepository = new TaskRepository(db);
    const tasks = await taskRepository.getAll();
    return res.json(tasks.map(TaskMapper.toDTO));
}

export async function addTask(req: Request, res: Response) {
    const { installer, type, client, clientAddress, notes } = req.body;
    const clientRepository = new ClientRepository(db);
    const taskRepository = new TaskRepository(db);
    try {
        const clientObj = await clientRepository.findClientById(parseInt(client));

        if (!client) {
            res.status(400).json({ message: "Client not found " });
            return;
        }

        let task = new Task(installer, type, client, clientAddress, notes);
        task = await taskRepository.save(task);
        res.status(201).json(TaskMapper.toDTO(task));
    }
    catch (error) {
        handleException(res, error);
    }
}