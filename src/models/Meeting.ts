export class Meeting {
    id: number;
    time: Date;
    place: string;
    succesful: boolean;
    outcomeComment: string;
    client: number;
    phoneOperator: number;
    salesAgent: number;

    constructor (time: Date, place: string, client: number, phoneOperator: number, salesAgent: number , successful?: boolean, outcomeComment?:string,) {
        this.id = -1;
        this.time = time;
        this.place = place;
        this.succesful = successful ?? false;
        this.outcomeComment = outcomeComment ?? '';
        this.client = client;
        this.phoneOperator = phoneOperator;
        this.salesAgent = salesAgent;
    }
}