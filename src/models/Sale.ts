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
}