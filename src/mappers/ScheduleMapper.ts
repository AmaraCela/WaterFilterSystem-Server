import { AgentSchedule } from "../models/AgentSchedule";
import { AgentScheduleDTO } from "../dtos/AgentScheduleDTO";
import { AllAgentSchedulesDTO } from "../dtos/AllAgentSchedulesDTO";

export class ScheduleMapper {
    public static toDTO(schedule: AgentSchedule): AgentScheduleDTO {
        return {
            id: schedule.id,
            day: schedule.day.toISOString(),
            startTime: schedule.startTime,
            endTime: schedule.endTime
        };
    }

    public static toDTOAll(schedule: AgentSchedule): AllAgentSchedulesDTO {
        return {
            id: schedule.id,
            day: schedule.day.toISOString(),
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            salesAgent: schedule.salesAgent
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