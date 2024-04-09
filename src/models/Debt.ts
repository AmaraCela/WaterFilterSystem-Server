export class Debt {
    nextPayment: Date;
    amountPaidOff: number;
    amountToCollect: number;
    sale: number;

    constructor(nextPayment: Date, amountPaidOff: number, amountToCollect: number, sale: number) {
        this.nextPayment = nextPayment;
        this.amountPaidOff = amountPaidOff;
        this.amountToCollect = amountToCollect;
        this.sale = sale;
    }
}