import { Commission } from "./Commission";

export class Sale {
    id: number;
    client: number;
    salesAgent: number;
    phoneOperator: number;
    time: Date | null;
    approved: boolean;
    price: number;
    warrantyExpiration: Date;
    renewalDate: Date;
    monthlyPayment: boolean;
    referredClients: number[];
    
    constructor(client: number, salesAgent: number, phoneOperator: number, price: number, warrantyExpiration: Date, renewalDate: Date, monthlyPayment: boolean = false, referredClients: number[] = [], time: Date | null = null, approved: boolean = false) {
        this.id = -1;
        this.client = client;
        this.salesAgent = salesAgent;
        this.phoneOperator = phoneOperator;
        this.referredClients = referredClients;
        this.time = time;
        this.approved = approved;
        this.price = price;
        this.monthlyPayment = monthlyPayment;
        this.warrantyExpiration = warrantyExpiration;
        this.renewalDate = renewalDate;
    }

    public generateCommissions(): Commission[] {
        const commissions: Commission[] = [];
        if (this.price == 0) {
            for (const client of this.referredClients) {
                commissions.push(new Commission(this.salesAgent, 0.5));
            }
            return commissions;
        }

        commissions.push(new Commission(this.salesAgent, 1.5));
        if (this.price >= 50) {
            commissions.push(new Commission(this.phoneOperator, 5));
        }

        if (this.price >= 295) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, 25));
            }
            else {
                commissions.push(new Commission(this.salesAgent, 20));
            }

            return commissions;
        }

        if (this.price >= 200) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, 20));
            }
            else {
                commissions.push(new Commission(this.salesAgent, 15));
            }

            return commissions;
        }

        if (this.price >= 100) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, 15));
            }
            else {
                commissions.push(new Commission(this.salesAgent, 10));
            }

            return commissions;
        }

        if (this.price >= 50) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, 10));
            }
            else {
                commissions.push(new Commission(this.salesAgent, 5));
            }

            return commissions;
        }

        // TODO CHECK PREVIOUS SALES OF THE MONTH
        // TODO CALCULATE AFTER-INSTALL COMMISSIONS
        
        return commissions;
    }
}