import { TaskType } from "../enums/TaskType";

export interface TaskDTO {
    task_id: number;
    installer: number;
    type: TaskType;
    client: number;
    clientAddress: string;
    notes: string | null;
}