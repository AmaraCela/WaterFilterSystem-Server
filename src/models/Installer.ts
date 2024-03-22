import { UserRole } from "../enums/UserRole";
import { User } from "./User";

export class Installer extends User {
    constructor(name: string, surname: string, email: string, passwordHash: string) {
        super(name, surname, email, passwordHash, UserRole.INSTALLER);
    }
}