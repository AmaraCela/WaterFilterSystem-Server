import { ClientStatus } from "../enums/ClientStatus";
export class Client {
    id: number;
    name: string | null;
    surname: string | null;
    phoneNo: string;
    address: string | null;
    profession: string | null;
    hasMadePurchase: boolean;
    lastCallDate: Date | null;
    nextContactDate: Date | null;
    referrals: Array<number>;
    status: ClientStatus;
    referredBy: Client | null;
    assignedOperator: number | null;
    referredInSale: number | null;

    constructor (name: string | null = null, surname: string | null = null, phoneNo: string, address: string | null = null, profession: string | null = null, hasMadePurchase: boolean = false, lastCallDate: Date | null = null, nextContactDate: Date | null = null, referrals: Array<number> = [], status: ClientStatus = ClientStatus.IN_WAITLIST, referredyBy: Client | null = null, assignedOperator: number, referredInSale: number | null = null) {
        this.id = -1;
        this.name = name;
        this.surname = surname;
        this.phoneNo = phoneNo;
        this.address = address;
        this.profession = profession;
        this.hasMadePurchase = hasMadePurchase;
        this.lastCallDate = lastCallDate;
        this.nextContactDate = nextContactDate;
        this.referrals = referrals;
        this.status = status;
        this.referredBy = referredyBy;
        this.assignedOperator = assignedOperator;
        this.referredInSale = referredInSale;
    }
}