import { PhoneOperator } from "./PhoneOperator";
import { Client } from "./Client";

export class Call {
    id: number;
    client: Client;
    phoneOperator: PhoneOperator;
    scheduledTime: Date;
    outcomeComment: string = "";
}