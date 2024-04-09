export interface SaleDTO {
    id: number,
    client: number,
    salesAgent: number,
    phoneOperator: number,
    time: string | null,
    approved: boolean,
    price: number,
    warrantyExpiration: string,
    renewalDate: string,
    monthlyPayment: boolean,
    debt: number | null,
    referredClients: number[]
}