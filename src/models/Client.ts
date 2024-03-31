import { ClientStatus } from "../enums/ClientStatus";
export class Client {
    clientId: number;
    name: string | null;
    surname: string | null;
    phoneNo: string;
    address: string | null;
    profession: string | null;
    hasMadePurchase: boolean;
    lastCallDate: Date | null;
    nextContactDate: Date | null;
    status: ClientStatus;
    referredBy: Client | null;
    assignedOperator: number | null;
    referredInSale: number | null;

    constructor (name: string|null = null, surname: string | null = null, phoneNo: string, address: string | null = null, profession: string | null = null, hasMadePurchase: boolean = false, lastCallDate: Date | null = null, nextContactDate: Date | null = null, status: ClientStatus = ClientStatus.IN_WAITLIST, referredyBy: Client | null = null, assignedOperator: number, referredInSale: number | null = null){
        this.clientId = -1;
        this.name = name;
        this.surname = surname;
        this.phoneNo = phoneNo;
        this.address = address;
        this.profession = profession;
        this.hasMadePurchase = hasMadePurchase;
        this.lastCallDate = lastCallDate;
        this.nextContactDate = nextContactDate;
        this.status = status;
        this.referredBy = referredyBy;
        this.assignedOperator = assignedOperator;
        this.referredInSale = referredInSale;
    }
}