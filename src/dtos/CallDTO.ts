export interface CallDTO {
    id: number,
    clientId: number,
    phoneOperatorId: number,
    scheduledTime: string,
    outcomeComment: string,
    completed: boolean,
    clientFullName: string | undefined,
    clientNumber: string | undefined
}