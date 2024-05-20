import { where } from "sequelize";
import { TaskMapper } from "../mappers/TaskMapper";
import { Task } from "../models/Task";
import { Repository } from "./Repository";

export class TaskRepository implements Repository<Task> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Task[]> {
        const tasks = await this.models.Task.findAll();
        return tasks.map(TaskMapper.toDomain);
    }

    async exists(t: Task): Promise<boolean> {
        const taskExists = await this.models.Task.findOne({
            where: {
                task_id: t.task_id
            }
        });

        return !!taskExists;
    }
    async delete(t: Task): Promise<any> {
        return await this.models.Task.destroy({
            where: {
                task_id: t.task_id
            }
        })
    }

    async save(t: Task): Promise<any> {
        let taskObj = await this.models.Task.findOne({
            where: {
                task_id: t.task_id
            }
        });

        if(taskObj != null) {
            taskObj = await taskObj.update(TaskMapper.toPersistance(t));
        }
        else {
            taskObj = await this.models.Task.create(TaskMapper.toPersistance(t));
        }

        return TaskMapper.toDomain(taskObj);
    }

}