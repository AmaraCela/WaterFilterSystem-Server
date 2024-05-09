export class Call {
    id: number;
    client: number;
    phoneOperator: number;
    scheduledTime: Date;
    outcomeComment: string;
    completed: boolean;

    constructor (client: number, phoneOperator: number, scheduledTime: Date, outcomeComment: string = "", completed: boolean = false) {
        const now = new Date();
        if (!completed && scheduledTime < now) {
            throw new Error("Can't schedule call in the past");
        }

        this.id = -1;
        this.client = client;
        this.phoneOperator = phoneOperator;
        this.scheduledTime = scheduledTime;
        this.outcomeComment = outcomeComment;
        this.completed = completed;
    }

}