import { AgentSchedule } from "../models/AgentSchedule";
import { AgentScheduleDTO } from "../dtos/AgentScheduleDTO";

export class ScheduleMapper{
    public static toDTO(schedule: AgentSchedule): AgentScheduleDTO {
        return {
            id: schedule.id,
            dayOfTheWeek: schedule.dayOfTheWeek,
            startTime: schedule.startTime.toISOString(),
            endTime: schedule.endTime.toISOString(),
            agentId: schedule.salesAgent,
        };
    }
}