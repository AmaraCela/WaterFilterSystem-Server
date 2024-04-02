import { AgentSchedule } from "../models/AgentSchedule";
import { AgentScheduleDTO } from "../dtos/AgentScheduleDTO";

export class ScheduleMapper {
    public static toDTO(schedule: AgentSchedule): AgentScheduleDTO {
        return {
            id: schedule.id,
            day: schedule.day.toISOString(),
            startTime: schedule.startTime,
            endTime: schedule.endTime
        };
    }

    public static toPersistence(schedule: AgentSchedule): any {
        return {
            schedule_id: schedule.id,
            day: schedule.day.toISOString(),
            startTime: schedule.startTime,
            endTime: schedule.endTime
        };
    }

    public static toDomain(schedule: any): AgentSchedule {
        if (!schedule) {
            return schedule;
        }

        const agentSchedule = new AgentSchedule(new Date(schedule.day), schedule.startTime, schedule.endTime, schedule.salesAgent);
        agentSchedule.id = schedule.schedule_id;

        return agentSchedule;
    }
}