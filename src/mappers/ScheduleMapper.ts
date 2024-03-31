import { AgentSchedule } from "../models/AgentSchedule";
import { AgentScheduleDTO } from "../dtos/AgentScheduleDTO";

export class ScheduleMapper{
    public static toDTO(schedule: AgentSchedule): AgentScheduleDTO {
        return {
            id: schedule.schedule_id,
            dayOfTheWeek: schedule.dayOfTheWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            agentId: schedule.salesAgent,
        };
    }
}