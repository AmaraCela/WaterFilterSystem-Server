import { User } from "./User";
import { UserRole } from "../enums/UserRole";
import { Call } from "./Call";

export class PhoneOperator extends User {
    calls: Array<Call> = [];

    constructor(name: string, surname: string, email: string, passwordHash: string) {
        super(name, surname, email, passwordHash, UserRole.PHONE_OPERATOR);
    }
}