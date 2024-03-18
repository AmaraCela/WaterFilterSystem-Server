import { User } from "./User";
import { UserRole } from "../enums/UserRole";

export class PhoneOperator extends User {
    constructor(name: string, surname: string, email: string, passwordHash: string) {
        super(name, surname, email, passwordHash, UserRole.PHONE_OPERATOR);
    }
}