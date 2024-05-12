export class Call {
    id: number;
    client: number;
    phoneOperator: number;
    scheduledTime: Date;
    outcomeComment: string;
    completed: boolean;
    clientFullName: string | null = null;
    clientNumber: string | null = null;

    constructor (client: number, phoneOperator: number, scheduledTime: Date, outcomeComment: string = "", completed: boolean = false) {
        const now = new Date();
        if (!completed && scheduledTime < now) {
            scheduledTime = now;
        }

        this.id = -1;
        this.client = client;
        this.phoneOperator = phoneOperator;
        this.scheduledTime = scheduledTime;
        this.outcomeComment = outcomeComment;
        this.completed = completed;
    }
}