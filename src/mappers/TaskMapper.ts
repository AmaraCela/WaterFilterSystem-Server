import { TaskDTO } from "../dtos/TaskDTO";
import { Task } from "../models/Task";

export class TaskMapper {
    public static toDTO(task: Task): TaskDTO {
        return {
            task_id: task.task_id,
            installer: task.installer,
            type: task.type,
            client: task.client,
            clientAddress: task.clientAddress,
            notes: task.notes,
        };
    }

    public static toDomain(task: any): Task {
        if(!task) {
            return task;
        }

        const taskModel = new Task(task.installer, task.type, task.client, task.clientAddress, task.notes)
        taskModel.task_id = task.task_id;
        return taskModel;
    }

    public static toPersistance(task: Task) {
        return {
            installer: task.installer,
            type: task.type,
            client: task.client,
            clientAddress: task.clientAddress,
            notes: task.notes
        }
    }
}