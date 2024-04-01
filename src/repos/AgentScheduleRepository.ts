import { ScheduleMapper } from "../mappers/ScheduleMapper";
import { AgentSchedule } from "../models/AgentSchedule";
import { Repository } from "./Repository";

export class AgentScheduleRepository implements Repository<AgentSchedule> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async getAll(): Promise<AgentSchedule[]> {
        const schedules = await this.models.AgentSchedule.findAll();
        return schedules.map(ScheduleMapper.toDomain);
    }

    async getByAgentId(agentId: number): Promise<AgentSchedule[]> {
        const schedules = await this.models.AgentSchedule.findAll({
            where: {
                salesAgent: agentId
            }
        });

        return schedules.map(ScheduleMapper.toDomain);
    }

    async getByScheduleId(scheduleId: number): Promise<AgentSchedule> {
        const schedule = await this.models.AgentSchedule.findOne({
            where: {
                schedule_id: scheduleId
            }
        });

        return ScheduleMapper.toDomain(schedule);
    }
    
    async exists(schedule: AgentSchedule): Promise<boolean> {
        const scheduleExists = await this.models.AgentSchedule.findOne({
            where: {
                schedule_id: schedule.id
            }
        });

        return !!scheduleExists;
    }

    async delete(schedule: AgentSchedule): Promise<any> {
        return await this.models.AgentSchedule.destroy({
            where: {
                schedule_id: schedule.id
            }
        })
    }

    async save(schedule: AgentSchedule): Promise<any> {
        let scheduleObj = await this.models.AgentSchedule.findOne({
            where: {
                schedule_id: schedule.id
            }
        });
        
        if (scheduleObj != null) {
            scheduleObj = await scheduleObj.update(schedule);
        }
        else {
            scheduleObj = await this.models.AgentSchedule.create(schedule);
        }

        return ScheduleMapper.toDomain(scheduleObj);
    }
}