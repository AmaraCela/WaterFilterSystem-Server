import { Meeting } from "../models/Meeting";
export class MeetingRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Meeting[]> {
        return await this.models.Meeting.findAll(); 
    }

    async getMeetingsOfAgent(agentid: number): Promise<Meeting[]> {
        const meetings = this.models.Meeting.findAll({
            where: {
                salesAgent: agentid,
            }
        });
        return meetings;
    }

}