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

    // TODO ensure no overlaps
    ensureValidSchedule() {
        const now = new Date();
        if (this.day < now) {
            throw new Error("Can't create schedule in the past");
        }

        const nextMonday = new Date();
        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
        nextMonday.setHours(0, 0, 0, 0);

        if (this.day >= nextMonday) {
            throw new Error("Can't create schedule further than this week");
        }
        
        const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
        if (!regex.test(this.startTime) || !regex.test(this.endTime)) {
            throw new Error("Invalid time format");
        }

        if (this.startTime >= this.endTime) {
            throw new Error("Start time must be before end time");
        }
    }   
}