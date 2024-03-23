export interface PhoneOperatorDTO {
    id: number,
    name: string,
    surname: string,
    email: string,
    calls: Array<number>,
    role: string
    // callHistory: Array<number>
}