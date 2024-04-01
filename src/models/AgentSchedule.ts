export class AgentSchedule {
    id: number;
    day: Date;
    startTime: string;
    endTime: string;
    salesAgent: number;

    constructor (day: Date, startTime: string, endTime: string, salesAgent: number) {
        this.id = -1;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.salesAgent = salesAgent;
    }
}