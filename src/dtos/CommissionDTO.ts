export interface CommissionDTO {
    id: number,
    amount: number,
    approved: boolean,
    userPaidTo: number,
    type: string
}