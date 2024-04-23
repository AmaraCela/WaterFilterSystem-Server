export class Commission {
    id: number;
    amount: number;
    approved: boolean;
    userPaidTo: number;

    constructor(userPaidTo: number, amount: number = 0, approved: boolean = false) {
        this.id = -1;
        this.amount = amount;
        this.approved = approved;
        this.userPaidTo = userPaidTo;
    }
}