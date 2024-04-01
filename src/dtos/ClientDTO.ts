export interface ClientDTO {
    id: number,
    name: string | null,
    surname: string | null,
    phoneNo: string,
    address: string | null,
    profession: string | null,
    hasMadePurchase: boolean,
    lastCallDate: string | null,
    nextContactDate: string | null,
    referrals: Array<number>,
    referredBy: number | null,
    status: string,
    assignedOperator: number | null,
    referredInSale: number | null,
}