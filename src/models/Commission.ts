import { CommissionType } from "../enums/CommissionType";

export class Commission {
    id: number;
    amount: number;
    approved: boolean;
    userPaidTo: number;
    type: CommissionType;

    constructor(userPaidTo: number, type: CommissionType, amount: number = 0, approved: boolean = false) {
        this.id = -1;
        this.amount = amount;
        this.approved = approved;
        this.userPaidTo = userPaidTo;
        this.type = type;
    }
}