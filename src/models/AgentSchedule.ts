export class AgentSchedule {
    schedule_id: number;
    dayOfTheWeek: string;
    startTime: Date;
    endTime: Date;
    salesAgent: string;

    constructor (dayOfTheWeek: string, startTime: Date, endTime: Date, salesAgent: string) {
        this.schedule_id = -1;
        this.dayOfTheWeek = dayOfTheWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.salesAgent = salesAgent;
    }
}