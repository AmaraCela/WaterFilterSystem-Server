import { TaskType } from "../enums/TaskType";

export class Task {
    task_id: number;
    installer: number;
    type: TaskType;
    client: number;
    clientAddress: string;
    notes: string | null = null;

    constructor (installer: number, type: TaskType, client: number, clientAddress: string, notes?: string) {
        this.task_id = -1;
        this.installer = installer;
        this.type = type;
        this.client = client;
        this.clientAddress = clientAddress;
        this.notes = notes ?? null;
    }

}