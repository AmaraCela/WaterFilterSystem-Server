export class AgentSchedule {
    id: number;
    dayOfTheWeek: string;
    startTime: Date;
    endTime: Date;
    salesAgent: number;

    constructor (dayOfTheWeek: string, startTime: Date, endTime: Date, salesAgent: number) {
        this.id = -1;
        this.dayOfTheWeek = dayOfTheWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.salesAgent = salesAgent;
    }
}