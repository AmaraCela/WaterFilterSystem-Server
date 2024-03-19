export class AgentSchedule {
    schedule_id: number;
    dayOfTheWeek: string;
    startTime: Date;
    endTime: Date;

    constructor (dayOfTheWeek: string, startTime: Date, endTime: Date) {
        this.schedule_id = -1;
        this.dayOfTheWeek = dayOfTheWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}