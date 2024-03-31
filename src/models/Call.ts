export class Call {
    call_id: number;
    client: number;
    phoneOperator: number;
    scheduledTime: Date;
    outcomeComment: string = "";

    constructor (client: number, phoneOperator: number, scheduledTime: Date, outcomeComment: string) {
        this.call_id = -1;
        this.client = client;
        this.phoneOperator = phoneOperator;
        this.scheduledTime = scheduledTime;
        this.outcomeComment = outcomeComment;
    }

}