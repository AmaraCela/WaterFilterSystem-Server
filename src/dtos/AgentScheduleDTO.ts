export interface AgentScheduleDTO {
    id: number;
    dayOfTheWeek: string;
    startTime: Date;
    endTime: Date;
    agentId: number;
}