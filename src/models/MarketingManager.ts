import { UserRole } from "../enums/UserRole";
import { User } from "./User";

export class MarketingManager extends User {
    constructor(name: string, surname: string, email: string, passwordHash: string) {
        super(name, surname, email, passwordHash, UserRole.MARKETING_MANAGER);
    }
}