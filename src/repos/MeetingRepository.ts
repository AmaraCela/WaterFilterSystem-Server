import { where } from "sequelize";
import { Meeting } from "../models/Meeting";
export class MeetingRepository {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<Meeting[]> {
        return await this.models.Meeting.findAll(); 
    }

    async getMeetingsOfAgent(agentid: string): Promise<Meeting[]> {
        const meetings = this.models.Meeting.findAll({
            where: {
                salesAgent: agentid,
            }
        });
        return meetings;
    }

    async save(meeting: Meeting){
        let meetingg = await this.models.Meeting.findOne({
            where: {
                meeting_id: meeting.id
            }
        });

        if(meetingg == null) {
            meetingg = await this.models.Meeting.create(meeting);
        }

        return meetingg;
    }

}