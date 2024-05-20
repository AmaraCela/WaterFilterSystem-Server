import { Request, Response } from "express";
import db from "../sequelize/models";
import { handleException } from "./utils/ErrorHandler";
import { TaskRepository } from "../repos/TaskRespository";
import { TaskMapper } from "../mappers/TaskMapper";

const { param, body } = require('express-validator');
export const idValidator = [
    param('id').exists().isInt().withMessage("Invalid task id")
]

export async function getAllTasks(req: Request, res: Response) {
    const taskRepository = new TaskRepository(db);
    const tasks = await taskRepository.getAll();
    return res.json(tasks.map(TaskMapper.toDTO));

}