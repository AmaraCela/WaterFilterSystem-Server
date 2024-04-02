export interface PhoneOperatorDTO {
    id: number,
    name: string,
    surname: string,
    email: string,
    calls: Array<number>,
    callHistory: Array<number>
}