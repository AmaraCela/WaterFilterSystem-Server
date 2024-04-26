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
            },
            include: [{
                model: this.models.Client,
                attributes: [['client_id', 'id'], 'name', 'surname', 'address']
            }]
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

    async delete(meeting_id: number){
        const meetingFound = await this.models.Meeting.findOne({
            where: {
                meeting_id
            }
        });

        return await meetingFound.destroy();
    }

}