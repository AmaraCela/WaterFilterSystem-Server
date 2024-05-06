export interface SaleDTO {
    id: number,
    client: number,
    salesAgent: number,
    phoneOperator: number,
    time: string | null,
    approved: "PENDING" | "APPROVED" | "REJECTED",
    price: number,
    warrantyExpiration: string,
    renewalDate: string,
    monthlyPayment: boolean,
    referredClients: number[]
}