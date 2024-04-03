import { ScheduleMapper } from "../mappers/ScheduleMapper";
import { AgentSchedule } from "../models/AgentSchedule";
import { Repository } from "./Repository";

export class AgentScheduleRepository implements Repository<AgentSchedule> {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    private async deleteOldSchedules() {
        const lastMonday = new Date();
        lastMonday.setDate(lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7));
        lastMonday.setHours(0, 0, 0, 0);

        await this.models.AgentSchedule.destroy({
            where: {
                day: {
                    [this.models.Sequelize.Op.lt]: lastMonday
                }
            }
        });
    }

    async getAll(): Promise<AgentSchedule[]> {
        this.deleteOldSchedules();

        const schedules = await this.models.AgentSchedule.findAll();
        return schedules.map(ScheduleMapper.toDomain);
    }

    async getByAgentId(agentId: number): Promise<AgentSchedule[]> {
        this.deleteOldSchedules();

        const schedules = await this.models.AgentSchedule.findAll({
            where: {
                salesAgent: agentId
            }
        });

        return schedules.map(ScheduleMapper.toDomain);
    }

    async getByScheduleId(salesAgentId: number, scheduleId: number): Promise<AgentSchedule> {
        this.deleteOldSchedules();

        const schedule = await this.models.AgentSchedule.findOne({
            where: {
                salesAgent: salesAgentId,
                schedule_id: scheduleId
            }
        });

        return ScheduleMapper.toDomain(schedule);
    }

    async exists(schedule: AgentSchedule): Promise<boolean> {
        this.deleteOldSchedules();

        const scheduleExists = await this.models.AgentSchedule.findOne({
            where: {
                salesAgent: schedule.salesAgent,
                schedule_id: schedule.id
            }
        });

        return !!scheduleExists;
    }

    async delete(schedule: AgentSchedule): Promise<any> {
        return await this.models.AgentSchedule.destroy({
            where: {
                salesAgent: schedule.salesAgent,
                schedule_id: schedule.id
            }
        })
    }

    async save(schedule: AgentSchedule): Promise<any> {
        let scheduleObj = await this.models.AgentSchedule.findOne({
            where: {
                salesAgent: schedule.salesAgent,
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