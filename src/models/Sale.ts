import { CommissionType } from "../enums/CommissionType";
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

    public generateCommissions(salesOfThisMonth: number): Commission[] {
        const commissions: Commission[] = [];
        if (this.price == 0) {CommissionType
            commissions.push(new Commission(this.salesAgent, CommissionType.REFERRAL, 0.5 * this.referredClients.length));
            return commissions;
        }
        
        // ?? is it 140 for after 3 sales or 140 for each of the first 3 sales?
        // is it 150 * 5 or 150 * 2 + 10 * 3?
        // do monthly payments count?
        if (salesOfThisMonth == 3) {
            commissions.push(new Commission(this.salesAgent, CommissionType.TIERED, 140 * 3));
        }
        else if (salesOfThisMonth == 5) {
            commissions.push(new Commission(this.salesAgent, CommissionType.TIERED, 150 * 5));
        }
        else if (salesOfThisMonth == 7) {
            commissions.push(new Commission(this.salesAgent, CommissionType.TIERED, 160 * 7));
        }

        commissions.push(new Commission(this.phoneOperator, CommissionType.TIERED, 1.5));
        if (this.price >= 50) {
            commissions.push(new Commission(this.phoneOperator, CommissionType.TIERED, 5));
        }

        if (this.price >= 295) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 25));
            }
            else {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 20));
            }

            return commissions;
        }

        if (this.price >= 200) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 20));
            }
            else {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 15));
            }

            return commissions;
        }

        if (this.price >= 100) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 15));
            }
            else {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 10));
            }

            return commissions;
        }

        if (this.price >= 50) {
            if (this.referredClients.length >= 10) {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 10));
            }
            else {
                commissions.push(new Commission(this.salesAgent, CommissionType.SPIF, 5));
            }

            return commissions;
        }

        // TODO CALCULATE AFTER-INSTALL COMMISSIONS
        
        return commissions;
    }
}