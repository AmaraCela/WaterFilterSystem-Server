export interface AgentScheduleDTO {
    id: number;
    dayOfTheWeek: string;
    startTime: string;
    endTime: string;
    agentId: number;
}