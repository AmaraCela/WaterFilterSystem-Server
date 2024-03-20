import { AgentSchedule } from "../models/AgentSchedule";
import { Repository } from "./Repository";

export class AgentScheduleRepository implements Repository<AgentSchedule> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async exists(schedule: AgentSchedule): Promise<boolean> {
        const scheduleExists = await this.models.AgentSchedule.findOne({
            where: {
                schedule_id: schedule.schedule_id
            }
        });

        return !!scheduleExists;
    }

    async delete(schedule: AgentSchedule): Promise<any> {
        return await this.models.AgentSchedule.destroy({
            where: {
                schedule_id: schedule.schedule_id
            }
        })
    }

    async save(schedule: AgentSchedule): Promise<any> {
        const scheduleObj = await this.models.AgentSchedule.findOne({
            where: {
                schedule_id: schedule.schedule_id
            }
        });
        
        if(scheduleObj != null) {
            return scheduleObj.update(schedule);
        }
        else {
            return await this.models.AgentSchedule.create(schedule);
        }
    }

}